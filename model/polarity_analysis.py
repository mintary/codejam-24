import nltk
from nltk.corpus import stopwords
from textblob import TextBlob
nltk.download("stopwords")
import string
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

def preprocess_text(text):
    text = text.lower()
    text = "".join([char for char in text if char not in string.punctuation])

    words = text.split()
    words = [word for word in words if word not in stopwords.words("english")]

    return " ".join(words)
def analyze_sentiment(text):
    analysis = TextBlob(text)
    if analysis.sentiment.polarity > 0:
        return "Positive"
    elif analysis.sentiment.polarity == 0:
        return "Neutral"
    else:
        return "Negative"

text_data = [
    "SEC Chair Gary Gensler, who led US crackdown on cryptocurrencies, to step down",
    "An influx of outsiders and money turns Montana Republican, culminating in a Senate triumph",
    "Guest lineups for the Sunday news shows",
    "JD Vance is leaving the Senate for the vice presidency. That’s set off a scramble for his Ohio seat",
    "Trump convinced Republicans to overlook his misconduct. But can he do the same for his nominees?",
]

for text in text_data:
    preprocessed_text = preprocess_text(text)
    sentiment = analyze_sentiment(preprocessed_text)
    print(f"Text: {text}\nSentiment: {sentiment}\n")


analyzer = SentimentIntensityAnalyzer()
for text in text_data:
    sentiment = analyzer.polarity_scores(text)
    print(f"Text: {text}\nSentiment: {sentiment}\n")
