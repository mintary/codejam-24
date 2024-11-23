import joblib
import os

class CategoryModel:
    def __init__(self):
        self.model = None
        self.vectorizer = None
        self.label_encoder = None
    
    def load_model_and_vectorizer(self):
        self.model = joblib.load("data_processing/models/news_category_model.pkl")
        self.vectorizer = joblib.load("data_processing/models/vectorizer.pkl")
        self.label_encoder = joblib.load("data_processing/models/label_encoder.pkl")
    
    def predict_categories(self, headlines):
        if self.model is None or self.vectorizer is None or self.label_encoder is None:
            self.load_model_and_vectorizer()

        X_new = self.vectorizer.transform(headlines)

        predictions = self.model.predict(X_new)

        predicted_labels = self.label_encoder.inverse_transform(predictions)
        return predicted_labels