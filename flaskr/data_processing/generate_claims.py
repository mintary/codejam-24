import requests
import ijson
import typing_extensions as typing
from bs4 import BeautifulSoup
import json
import random
import os
from langdetect import detect
from flaskr.data_processing.category_model import CategoryModel
import google.generativeai as genai
from dotenv import load_dotenv

class Claim(typing.TypedDict):
    claim: str
    category: str

class ClaimsGenerator:
    def __init__(self):
        load_dotenv()
        genai.configure(api_key=os.environ["GEMINI_API_KEY"])
        self.model = genai.GenerativeModel("gemini-1.5-flash")
        
        self.QUESTION_WORDS = {
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

        self.EXCLUDE_MEDIA = {
            "video",
            "photo",
            "visuals",
            "image",
            "picture"
        }

        self.DOUBLE_QUOTE = {
            "“",
        }
    
    def contains_text(self, text, set):
        return any(word in text for word in set)

    def scrape_factcheck(self, n: int, max_offset: int):
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
                    if item[0]["@type"] == "ClaimReview" and "false" in item[0]["reviewRating"]["alternateName"].lower() and lang == "en" and "?" not in claimReviewed  and not self.contains_text(claimReviewed.lower(), self.QUESTION_WORDS) and not self.contains_text(claimReviewed.lower(), self.EXCLUDE_MEDIA) and not self.contains_text(claimReviewed.lower(), self.DOUBLE_QUOTE):
                        predicted_category = category_model.predict_categories([claimReviewed])
                        if predicted_category and predicted_category[0].lower() in ["politics", "science"]:
                            claims.append({
                                    "claim": claimReviewed.strip("\n"),
                                    "category": predicted_category[0]
                                })
        else:
            print(f"Failed to fetch data. Status code: {response.status_code}")

        return claims

    def scrape_political(self, n: int):
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

        filtered_headlines = self.filter_headlines(headlines)

        return filtered_headlines

    def scrape_medical(self, n: int):
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

        filtered_headlines = self.filter_headlines(headlines)

        return filtered_headlines

    def filter_headlines(self, headlines):
        filtered = []
        for headline in headlines:
            if "?" not in headline and not self.contains_text(headline, self.QUESTION_WORDS):
                filtered.append(headline)
        return filtered

        
    def fix_json_kill_me(self, text):
        lines = text.splitlines()
        no_backticks = lines[1:-1] 
        processed_text = "".join(no_backticks)
        json_data = json.loads(processed_text)
        return json_data
    
    def convert_to_headlines(self, claims):
        response = self.model.generate_content(f"Summarize statements and write events as if they occured in the present. Return as JSON list of strings and categories: {claims}")
        processed_claims = self.fix_json_kill_me(response.text)
        return processed_claims
    
    def test_headlines(self):
        med_headlines = self.scrape_medical(15)
        filtered_med = self.filter_headlines(med_headlines)
        print(filtered_med)

        political_headlines = self.scrape_political(15)
        filtered_political = self.filter_headlines(political_headlines)
        print(filtered_political)

        false_claims = self.scrape_factcheck(15, 7)
        shit = self.convert_to_headlines(false_claims)
        print(shit)

    def wrong_claims(self, category, number):
        result = []
        while len(result) < number:
            false_claims = self.scrape_factcheck(10,4)
            for claim in false_claims:
                if len(result) == number:
                    break
                if claim['category'] == category:
                    result.append(number)



"""
claims = ClaimsGenerator()
print(claims.scrape_medical(10))
print(claims.scrape_political(10))
print(claims.scrape_factcheck(10, 4))
"""