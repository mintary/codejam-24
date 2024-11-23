class GameService:
    def __init__(self, answer, question):
        self.answer = answer
        self.question = question


    def submit_answer(self, data):
        answer = data['answer']
        return answer == self.answer