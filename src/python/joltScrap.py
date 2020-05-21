import requests
from bs4 import BeautifulSoup

URL = "https://www.metacritic.com/browse/games/release-date/available/pc/date"

response = requests.get(URL, headers={"User-Agent": "Mozilla"})

soup = BeautifulSoup(response.text, "html.parser")
pages = soup.find("ul", class_="pages").find_all("li", class_="page").find("page_num")
last_page = pages[0:-1]

print(last_page)