from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
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


"""
@app.route('/friend', methods=['POST'])
@jwt_required()
def add_friend():
    data = request.get_json()
    return _authServ.add_friend(data)

"""


@app.route('/friend')
def list_friends():
    data = request.get_json()
    return _authServ.list_friends(data)


@app.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    data = request.get_json()
    return _authServ.get_user(data)


@app.route('/update-score', methods=['POST'])
def submit_answer():
    data = request.get_json()
    return _authServ.update_score(data)


@app.route('/get-question', methods=['GET'])
def get_question():
    category = request.args.get('category')
    if not category:
        return {"error": "Category is required"}, 400
    return _gameServ.get_question(category)


@app.route('/test', methods=['POST'])
@jwt_required()
def test():
    print(request.get_json())
    return jsonify({'message': 'Success'})


if __name__ == '__main__':
    print('Running the app')

    with app.app_context():
        app.run(debug=False)
