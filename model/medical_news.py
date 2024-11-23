import requests
from bs4 import BeautifulSoup

url = 'https://www.medicalnewstoday.com/news'

response = requests.get(url)
if response.status_code == 200:
    soup = BeautifulSoup(response.text, 'html.parser')

    ol_elements = soup.find_all('ol')

    if ol_elements:
        for index, ol in enumerate(ol_elements):
            print(f"Ordered List {index + 1}:")
            print(ol)
            print('-' * 40)
    else:
        print("No <ol> elements found.")

else:
    print(f"Failed to retrieve content, status code {response.status_code}")
