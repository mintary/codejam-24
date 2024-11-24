from sqlalchemy import JSON

from flaskr import db


class Claim(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    claim = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)

    def __init__(self, claim, category):
        self.claim = claim
        self.category = category

    def __repr__(self):
        return f"<Claim id={self.id} claim='{self.claim}' category='{self.category}'>"
