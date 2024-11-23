import requests
from bs4 import BeautifulSoup

url = 'https://apnews.com/politics'
response = requests.get(url)

soup = BeautifulSoup(response.content, 'html.parser')

divs = soup.find_all('div', class_='PagePromo')

for div in divs:
    print(div)
    print('-' * 80)