import joblib
import os
import random

class CategoryModel:
    def __init__(self):
        self.model = None
        self.vectorizer = None
        self.label_encoder = None
        self.random_offset = random.randint(0, 10)
    
    def load_model_and_vectorizer(self):
        script_dir = os.path.dirname(os.path.abspath(__file__))

        model_path = os.path.join(script_dir, "models/news_category_model.pkl")
        vectorizer_path = os.path.join(script_dir, "models/vectorizer.pkl")
        label_encoder_path = os.path.join(script_dir, "models/label_encoder.pkl")

        self.model = joblib.load(model_path)
        self.vectorizer = joblib.load(vectorizer_path)
        self.label_encoder = joblib.load(label_encoder_path)

        # self.model = joblib.load("data_processing/models/news_category_model.pkl")
        # self.vectorizer = joblib.load("data_processing/models/vectorizer.pkl")
        # self.label_encoder = joblib.load("data_processing/models/label_encoder.pkl")
    
    def predict_categories(self, headlines):
        if self.model is None or self.vectorizer is None or self.label_encoder is None:
            self.load_model_and_vectorizer()

        X_new = self.vectorizer.transform(headlines)

        predictions = self.model.predict(X_new)

        predicted_labels = self.label_encoder.inverse_transform(predictions)
        return predicted_labels