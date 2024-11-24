from flask_login import UserMixin
from sqlalchemy import JSON

from flaskr import db


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    total_score = db.Column(db.Integer, default=0)
    highest_score = db.Column(db.Integer, default=0)
    last_played = db.Column(db.DateTime, nullable=True)

    friends = db.Column(JSON, nullable=True, default=list)

    def __init__(self, username, password):
        self.username = username
        self.password = password

    def __repr__(self):
        return f'<User {self.username}>'
