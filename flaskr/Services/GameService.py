from flask import jsonify

from flaskr.data_processing.generate_claims import ClaimsGenerator

class GameService:
    def __init__(self, answer, question):
        self.claims = ClaimsGenerator()

    def get_question(self, data):
        print(data)
        category = data['category']
        right_claims = []
        wrong_claims = []
        if category == 'political':
            right_claims = self.claims.scrape_political(5)
            wrong_claims = self.claims.wrong_claims('political', 2)
        elif category == 'medical':
            right_claims = self.claims.scrape_medical(5)
            wrong_claims = self.claims.wrong_claims('medical', 2)

        return jsonify({'right_claims': right_claims, 'wrong_claims': wrong_claims}), 200