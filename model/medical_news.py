import requests
from bs4 import BeautifulSoup

# Step 1: Crawl the main page to get article links
url = "https://www.medicalnewstoday.com/news"
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

# Find all article links (assuming <a> tags with the class 'css-1w7wua3' are the article links)
article_links = []
for link in soup.find_all('a', class_='css-1w7wua3'):
    article_url = link.get('href')
    if article_url and article_url.startswith('https'):
        article_links.append(article_url)

# Step 2: Crawl each article page
for article_url in article_links:
    print(f"Crawling article: {article_url}")
    article_response = requests.get(article_url)
    article_soup = BeautifulSoup(article_response.text, 'html.parser')
    
    # Step 3: Search for author information
    author = None
    author_tag = article_soup.find('span', class_='author-name')  # Change this selector as per the website's structure
    if author_tag:
        author = author_tag.get_text().strip()
    
    if author:
        print(f"Author: {author}")
    else:
        print("Author information not found.")
