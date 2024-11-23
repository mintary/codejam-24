import requests
import ijson
import typing_extensions as typing
from bs4 import BeautifulSoup
import json
import random
import os
from langdetect import detect
from category_model import CategoryModel
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.environ["GEMINI_API_KEY"])
model = genai.GenerativeModel("gemini-1.5-flash")

QUESTION_WORDS = {
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

EXCLUDE_MEDIA = {
    "video",
    "photo",
    "visuals",
    "image",
    "picture"
}

DOUBLE_QUOTE = {
    "“",
}
# get claims from google fact check api datafeed

# spaghetti ass code i'm sorry

def contains_text(text, set):
    return any(word in text for word in set)

def scrape_factcheck(n: int, max_offset: int):
    category_model = CategoryModel()

    response = requests.get("https://storage.googleapis.com/datacommons-feeds/factcheck/latest/data.json", stream=True)
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
                if item[0]["@type"] == "ClaimReview" and "false" in item[0]["reviewRating"]["alternateName"].lower() and lang == "en" and "?" not in claimReviewed  and not contains_text(claimReviewed.lower(), QUESTION_WORDS) and not contains_text(claimReviewed.lower(), EXCLUDE_MEDIA) and not contains_text(claimReviewed.lower(), DOUBLE_QUOTE):
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
    response = requests.get("https://apnews.com/world-news")
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
    response = requests.get("https://www.medicalnewstoday.com/news")

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
        if "?" not in headline and not contains_text(headline, QUESTION_WORDS):
            filtered.append(headline)
    return filtered

class Claim(typing.TypedDict):
  claim: str
  category: str

        
def fix_json_kill_me(text):
    lines = text.splitlines()
    no_backticks = lines[1:-1] 
    processed_text = "".join(no_backticks)
    json_data = json.loads(processed_text)
    return json_data

'''
convert the claims to slightly more
legit sounding headlines
'''
def convert_to_headlines(claims):
    response = model.generate_content(f"Summarize statements and write events as if they occured in the present. Return as JSON list of strings and categories: {claims}")
    processed_claims = fix_json_kill_me(response.text)
    return processed_claims

med_headlines = scrape_medical(15)
filtered_med = filter_headlines(med_headlines)
print(filtered_med)

political_headlines = scrape_political(15)
filtered_political = filter_headlines(political_headlines)
print(filtered_political)

false_claims = scrape_factcheck(15, 7)
shit = convert_to_headlines(false_claims)
print(shit)