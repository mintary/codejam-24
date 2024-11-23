import joblib
import os

class CategoryModel:
    def __init__(self):
        self.model = None
        self.vectorizer = None
        self.label_encoder = None
    
    def load_model_and_vectorizer(self):
        model_path = os.path.join(os.path.dirname(__file__), "news_category_model.pkl")
        vectorizer_path = os.path.join(os.path.dirname(__file__), "vectorizer.pkl")
        label_encoder_path = os.path.join(os.path.dirname(__file__), "label_encoder.pkl")

        self.model = joblib.load(model_path)
        self.vectorizer = joblib.load(vectorizer_path)
        self.label_encoder = joblib.load(label_encoder_path)
    
    def predict_categories(self, headlines):
        if self.model is None or self.vectorizer is None or self.label_encoder is None:
            self.load_model_and_vectorizer()

        X_new = self.vectorizer.transform(headlines)

        predictions = self.model.predict(X_new)

        predicted_labels = self.label_encoder.inverse_transform(predictions)
        return predicted_labels