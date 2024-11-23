import requests
from selenium import webdriver
from bs4 import BeautifulSoup
import time
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

url1 = 'https://www.medicalnewstoday.com/news'
url2 = 'https://apnews.com/world-news'
# driver = webdriver.Chrome()

def scrape_political():
    articles = []
    response = requests.get(url2)
    if response.status_code != 200:
        print(f"Failed to retrieve the webpage. Status code: {response.status_code}")
    else: 
        time.sleep(5)
        soup = BeautifulSoup(response.content, "html.parser")
        articles = soup.find_all("div", class_="PagePromo")
        headlines = []
        for article in articles:
            headline = article.find("span", class_="PagePromoContentIcons-text")
            if headline and headline.text:
                headlines.append(headline.text)

    return headlines

def scrape_medical():
    articles = []
    response = requests.get(url1)

    if response.status_code != 200:
        print(f"Failed to retrieve the webpage. Status code: {response.status_code}")
    else:
        time.sleep(5) 
        soup = BeautifulSoup(response.content, "html.parser")
        articles = soup.find_all("li")
        headlines = []

        for article in articles:
            headline = article.find("h2")
            if headline != None and headline.text:
                headlines.append(headline.text)

    return headlines

'''
Remove articles that are overly opinionated/rhetorical question title
'''
def filterArticles(articles):
    filteredArticles = []
    for article in articles:
