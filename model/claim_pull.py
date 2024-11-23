import requests
import json
import ijson

url = "https://storage.googleapis.com/datacommons-feeds/factcheck/latest/data.json"

# get claims from google fact check api datafeed

response = requests.get(url, stream=True)
if response.status_code == 200:
    objects = ijson.items(response.raw, "dataFeedElement.item")
    first_three = []
    for obj in objects:
        first_three.append(obj)
        if len(first_three) == 20:
            break

    print(first_three)
else:
    print(f"Failed to fetch data. Status code: {response.status_code}")
