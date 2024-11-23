import os

from flask import Flask, jsonify, request
from flask_bcrypt import Bcrypt
from flask_login import UserMixin
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from sqlalchemy import JSON
from dotenv import load_dotenv

app = Flask(__name__)

# Configuration

load_dotenv()
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY')
app.config['JWT_TOKEN_LOCATION'] = ['headers']

# Database Initialization
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# JWT Initialization
jwt = JWTManager(app)

# Bcrypt Initialization
bcrypt = Bcrypt(app)

# Models

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    score = db.Column(db.Integer, default=0)
    last_played = db.Column(db.DateTime, nullable=True)

    friends = db.Column(JSON, nullable=True, default=list)

    def __repr__(self):
        return f'<User {self.username}>'



# Rest of the application code (routes, etc.)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']
    print('Received data:', username , password)

    user = User.query.filter_by(username=username).first()

    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=user.id)
        return jsonify({'message': 'Login Success', 'access_token': access_token})
    else:
        return jsonify({'message': 'Login Failed'}), 401

if __name__ == '__main__':
    print('Running the app')

    with app.app_context():
        app.run(debug=False)

