import os

from dotenv import load_dotenv
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt

app = Flask(__name__)
db = SQLAlchemy()
migrate = Migrate(app, db)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)
def create_app():

    load_dotenv()
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config["JWT_SECRET_KEY"] = os.getenv('JWT_SECRET_KEY')
    app.config['JWT_TOKEN_LOCATION'] = ['headers']

    db.init_app(app)


    return app