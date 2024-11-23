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
    "Elon Musk’s budget crusade could cause a constitutional clash in Trump’s second term",
    "Number of women who are state lawmakers inches up to a record high",
    "Trump’s against climate action. But some right-wing governments are all for it",
    "Trump raced to pick many Cabinet posts. He took more time to settle on a treasury secretary",
    "What to know about Scott Bessent, Trump’s pick for treasury secretary",
    "North Carolina GOP’s legislative priorities for this year inch closer to becoming law",
    "Hurricane Helene isn’t the only big storm North Carolina is still recovering from",
    "Will the antitrust showdown launched under Biden turn into ‘Let’s Make A Deal’ under Trump?"
]

for text in text_data:
    preprocessed_text = preprocess_text(text)
    sentiment = analyze_sentiment(preprocessed_text)
    print(f"Text: {text}\nSentiment: {sentiment}\n")


analyzer = SentimentIntensityAnalyzer()
for text in text_data:
    sentiment = analyzer.polarity_scores(text)
    print(f"Text: {text}\nSentiment: {sentiment}\n")
