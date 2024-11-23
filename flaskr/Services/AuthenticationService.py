from flask import jsonify
from flask_jwt_extended import create_access_token

from flaskr.Models.User import User
from flaskr import bcrypt, db


class AuthenticationService:
    def login(self, data):
        username = data['username']
        password = data['password']
        print('Received data:', username, password)

        user = User.query.filter_by(username=username).first()

        if user and bcrypt.check_password_hash(user.password, password):
            access_token = create_access_token(identity=user.id, expires_delta=False)
            return jsonify({'message': 'Login Success', 'access_token': access_token})
        else:
            return jsonify({'message': 'Login Failed'}), 401

    def register(self, data):
        username = data['username']
        password = data['password']

        user = User.query.filter_by(username=username).first()
        print(user)
        if user is not None:
            return jsonify({'message': 'User already exists'}), 400

        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        user = User(username=username, password=hashed_password)
        db.session.add(user)
        db.session.commit()

        return jsonify({'message': 'User created successfully'}), 201

    def add_friend(self, data):
        username = data['username']
        friend = data['friend']

        user = User.query.filter_by(username=username).first()
        friend = User.query.filter_by(username=friend).first()

        if user is None:
            return jsonify({'message': 'User does not exist'}), 400

        if friend is not None:
            return jsonify({'message': 'Friend does not exist'}), 400

        if friend in user.friends:
            return jsonify({'message': 'Friend already added'}), 400

        user.friends.append(friend)
        db.session.commit()
        return jsonify({'message': 'Friend added successfully'}), 201

    def list_friends(self, data):
        username = data['username']
        user = User.query.filter_by(username=username).first()
        return jsonify({'friends': user.friends}), 200

    def get_user(self, data):
        username = data['username']
        user = User.query.filter_by(username=username).first()
        return user

    def add_score(self, data):
        username = data['username']
        user = User.query.filter_by(username=username).first()
        user.score += 1
        db.session.commit()
        return jsonify({'message': 'Score updated successfully'}), 200