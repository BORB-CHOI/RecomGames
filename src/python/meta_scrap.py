import requests
from bs4 import BeautifulSoup

URL = "https://www.metacritic.com/browse/games/release-date/available/pc/metascore"


def get_last_page(url):
    response = requests.get(url, headers={"User-Agent": "Mozilla"})
    soup = BeautifulSoup(response.text, "html.parser")
    pages = soup.find("ul", class_="pages").find_all("li", class_="page")
    last_page = pages[-1].a.get_text(strip=True)
    return int(last_page)


def extract_gmae(game_url):
    response = requests.get(
        f"https://www.metacritic.com{game_url}", headers={"User-Agent": "Mozilla"})
    soup = BeautifulSoup(response.text, "html.parser")
    game_info = soup.find("div", class_="left")
    title = game_info.find("div", class_="content_head").find(
        "div", class_="product_title").a.get_text(strip=True)
    print(title)

    return {'link': f"https://www.metacritic.com{game_url}"}


def extract_games(last_page, url):
    games = []
    for page in range(1):  # last_page
        response = requests.get(f"{url}?page={page}",
                                headers={"User-Agent": "Mozilla"})
        soup = BeautifulSoup(response.text, "html.parser")
        results = soup.find_all("li", class_="game_product")
        # for result in results:
        #     game_url = result.div.a["href"]
        #     game = extract_gmae(game_url)
        #     games.append(game)
        game_url = results[0].div.a["href"]
        game = extract_gmae(game_url)
        games.append(game)
    return games


def get_games(url):
    last_page = get_last_page(url)
    extract_games(last_page, url)


get_games(URL)
