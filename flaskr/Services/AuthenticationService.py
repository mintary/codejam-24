from datetime import date

from flask import jsonify
from flask_jwt_extended import create_access_token

from flaskr.Models.User import User
from flaskr import bcrypt, db


class AuthenticationService:
    def login(self, data):
        username = data['username']
        password = data['password']

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
        friend_username = data['friend']
        
        user = User.query.filter_by(username=username).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        friend = User.query.filter_by(username=friend_username).first()
        if not friend:
            return jsonify({"error": "Friend not found"}), 404

        if friend in user.friends:
            return jsonify({"error": "Already friends"}), 400

        user.friends.append(friend)
        db.session.commit()

        return jsonify({"message": f"{friend_username} added as a friend"}), 200

    def list_friends(self, username):
        user = User.query.filter_by(username=username).first()

        if user is None:
            return jsonify({'message': 'User does not exist'}), 400

        friends_data = []
        for friend in user.friends:
            friend_info = {
                'username': friend.username,
                'highest_score': friend.highest_score,
                'total_score': friend.total_score
            }
            friends_data.append(friend_info)

        return jsonify({'friends': friends_data}), 200

    def get_score(self, username):
        user = User.query.filter_by(username=username).first()
        
        if user:
            return {
                "total_score": user.total_score,
                "highest_score": user.highest_score,
                "last_played": user.last_played
            }
        else:
            return {"message": "User not found"}

    def get_user(self, data):
        username = data['username']
        user = User.query.filter_by(username=username).first()
        return user

    def update_score(self, data):
        username = data['username']
        new_score = data['score']
        user = User.query.filter_by(username=username).first()
        if user is None:
            return jsonify({'message': 'User does not exist'}), 400

        user.total_score = user.total_score + new_score

        if new_score > user.highest_score:
            user.highest_score = new_score

        user.last_played = date.today().strftime("%Y-%m-%d")
        db.session.commit()

        return jsonify({'message': 'Score updated successfully'}), 200
