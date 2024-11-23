import requests
import ijson
from selenium import webdriver
from bs4 import BeautifulSoup
import time
import random
from langdetect import detect

question_words = {
    "Who", 
    "What", 
    "Where", 
    "When", 
    "Why", 
    "How", 
    "Which", 
    "Whose", 
    "Whom"
}

RANDOM_OFFSET = random.randint(0, 40)
FALSE_CLAIMS = 5
url1 = 'https://www.medicalnewstoday.com/news'
url2 = 'https://apnews.com/world-news'
# driver = webdriver.Chrome()
url3 = "https://storage.googleapis.com/datacommons-feeds/factcheck/latest/data.json"

# get claims from google fact check api datafeed

def contains_question_word(text):
    return any(word in text for word in question_words)

def scrape_factcheck():
    response = requests.get(url3, stream=True)
    if response.status_code == 200:
        objects = ijson.items(response.raw, "dataFeedElement.item")
        claims = []
        for _ in range(RANDOM_OFFSET):
            next(objects, None)

        for object in objects:
            if len(claims) < FALSE_CLAIMS:
                item = object["item"]
                claimReviewed = item[0]["claimReviewed"]
                lang = detect(claimReviewed)
                if lang == "en" and '?' not in claimReviewed and not contains_question_word(claimReviewed):
                    claims.append(claimReviewed)

    else:
        print(f"Failed to fetch data. Status code: {response.status_code}")

    return claims

print(scrape_factcheck())


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
Remove headlines that are overly opinionated/rhetorical question title
'''
def filter_headlines(headlines):
    filtered = []
    for headline in headlines:
        if '?' not in headline and not contains_question_word(headline):
            filtered.append(headline)
    return filtered
    
# med_headlines = scrape_medical()
# filtered_med = filter_headlines(med_headlines)
# print(filtered_med)

    
# political_headlines = scrape_political()
# filtered_political = filter_headlines(political_headlines)
# print(filtered_political)