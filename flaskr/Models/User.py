from flask_login import UserMixin
from sqlalchemy import JSON

from flaskr import db

friends_association = db.Table(
    'friends',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('friend_id', db.Integer, db.ForeignKey('user.id'), primary_key=True)
)


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    total_score = db.Column(db.Integer, default=0)
    highest_score = db.Column(db.Integer, default=0)
    last_played = db.Column(db.DateTime, nullable=True)

    friends = db.relationship(
        'User',
        secondary=friends_association,
        primaryjoin=id == friends_association.c.user_id,
        secondaryjoin=id == friends_association.c.friend_id,
        backref='friend_of'
    )

    def __init__(self, username, password):
        self.username = username
        self.password = password
        self.total_score = 0
        self.highest_score = 0

    def __repr__(self):
        return f'<User {self.username}>'
