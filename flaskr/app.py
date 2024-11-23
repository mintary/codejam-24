from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from flaskr.Services.AuthenticationService import AuthenticationService
from flaskr.Services.GameService import GameService
from flaskr import create_app


app = create_app()

# Initialize services
_authServ = AuthenticationService()
_gameServ = GameService("answer", "question")


# Rest of the application code (routes, etc.)

@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    return _authServ.login(data)


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    print('Received data:', data)
    return _authServ.register(data)


@app.route('/friend', methods=['POST'])
@jwt_required()
def add_friend():
    data = request.get_json()
    return _authServ.add_friend(data)


@app.route('/friend', methods=['GET'])
@jwt_required()
def list_friends():
    data = request.get_json()
    return _authServ.list_friends(data)


@app.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    data = request.get_json()
    return _authServ.get_user(data)


@app.route('/submit_answer', methods=['GET'])
@jwt_required()
def submit_answer():
    data = request.get_json()
    if _gameServ.submit_answer(data):
        _authServ.add_score(data)
        return jsonify({'message': 'Correct answer!'}), 200
    return jsonify({'message': 'Incorrect answer!'}), 200


if __name__ == '__main__':
    print('Running the app')

    with app.app_context():
        app.run(debug=False)