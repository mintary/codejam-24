from flask import jsonify

from flaskr.data_processing.generate_claims import ClaimsGenerator

class GameService:
    def __init__(self, answer, question):
        self.claims = ClaimsGenerator()

    def get_question(self, data):
        category = data['category']
        right_claims = []
        wrong_claims = []
        if category == 'Politics':
            print("entered Politics")
            right_claims = self.claims.scrape_political(5)
            print(right_claims)
            wrong_claims = self.claims.wrong_claims('Politics', 2)
        elif category == 'Science':
            right_claims = self.claims.scrape_medical(5)
            print(right_claims)
            wrong_claims = self.claims.wrong_claims('Science', 2)

        return jsonify({'right_claims': right_claims, 'wrong_claims': wrong_claims}), 200