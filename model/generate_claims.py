import requests
import ijson
from selenium import webdriver
from bs4 import BeautifulSoup
import joblib
import time
import random
import os
from langdetect import detect
from category_model import CategoryModel

question_words = {
    "Who", 
    "What", 
    "Where", 
    "When", 
    "Why", 
    "How", 
    "Which", 
    "Whose", 
    "Whom",
    "Can"
}

exclude_media = {
    "video",
    "photo",
    "visuals",
    "image"
}

double_quote = {
    "“",
}

url1 = "https://www.medicalnewstoday.com/news"
url2 = "https://apnews.com/world-news"
# driver = webdriver.Chrome()
url3 = "https://storage.googleapis.com/datacommons-feeds/factcheck/latest/data.json"

# get claims from google fact check api datafeed

# spaghetti ass code i'm sorry

def contains_text(text, set):
    return any(word in text for word in set)

def scrape_factcheck(n: int, max_offset: int):
    category_model = CategoryModel()

    response = requests.get(url3, stream=True)
    if response.status_code == 200:
        objects = ijson.items(response.raw, "dataFeedElement.item")
        claims = []
        random_offset = random.randint(0, max_offset)
        for _ in range(random_offset):
            next(objects, None)

        for object in objects:
            if len(claims) < n:
                item = object["item"]
                claimReviewed = item[0]["claimReviewed"]
                lang = ""
                try: 
                    lang = detect(claimReviewed)
                except:
                    continue
                if item[0]["@type"] == "ClaimReview" and lang == "en" and "?" not in claimReviewed and not contains_text(claimReviewed.lower(), exclude_media) and not contains_text(claimReviewed.lower(), double_quote):
                    predicted_category = category_model.predict_categories([claimReviewed])
                    if predicted_category and predicted_category[0].lower() in ["politics", "science"]:
                        claims.append({
                                "claim": claimReviewed.strip("\n"),
                                "category": predicted_category[0]
                            })
    else:
        print(f"Failed to fetch data. Status code: {response.status_code}")

    return claims

def scrape_political(n: int):
    articles = []
    response = requests.get(url2)
    if response.status_code != 200:
        print(f"Failed to retrieve the webpage. Status code: {response.status_code}")
    else: 
        soup = BeautifulSoup(response.content, "html.parser")
        articles = soup.find_all("div", class_="PagePromo")
        headlines = []
        for article in articles:
            if len(headlines) != n:
                headline = article.find("span", class_="PagePromoContentIcons-text")
                if headline and headline.text:
                    headlines.append(headline.text)

    return headlines

def scrape_medical(n: int):
    articles = []
    response = requests.get(url1)

    if response.status_code != 200:
        print(f"Failed to retrieve the webpage. Status code: {response.status_code}")
    else:
        soup = BeautifulSoup(response.content, "html.parser")
        articles = soup.find_all("li")
        headlines = []

        for article in articles:
            if len(headlines) != n:
                headline = article.find("h2")
                if headline != None and headline.text:
                    headlines.append(headline.text)

    return headlines

"""
Remove headlines that are overly opinionated/rhetorical question title
"""
def filter_headlines(headlines):
    filtered = []
    for headline in headlines:
        if "?" not in headline and not contains_text(headline, question_words):
            filtered.append(headline)
    return filtered
    
med_headlines = scrape_medical(15)
filtered_med = filter_headlines(med_headlines)
print(filtered_med)

political_headlines = scrape_political(15)
filtered_political = filter_headlines(political_headlines)
print(filtered_political)

print(scrape_factcheck(15, 40))
