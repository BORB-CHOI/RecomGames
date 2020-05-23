import requests
from bs4 import BeautifulSoup

URL = "https://www.metacritic.com/browse/games/release-date/available/pc/metascore"


def get_last_page(url):
    response = requests.get(url, headers={"User-Agent": "Mozilla"})
    soup = BeautifulSoup(response.text, "html.parser")
    pages = soup.find("div", class_="pages").find(
        "ul", class_="pages").find_all("li", class_="page")
    last_page = pages[-1].a.get_text(strip=True)
    return int(last_page)


def trans_RD(en_date):
    kr_date = en_date
    return kr_date


def trans_genre(en_genre):
    kr_genre = en_genre
    return kr_genre


def extract_gmae(game_url):
    response = requests.get(
        f"https://www.metacritic.com{game_url}", headers={"User-Agent": "Mozilla"})
    soup = BeautifulSoup(response.text, "html.parser")
    game_info = soup.find("div", class_="left")
    title = game_info.find("div", class_="content_head").find(
        "div", class_="product_title").a.get_text(strip=True)
    platform = game_info.find("div", class_="content_head").find(
        "div", class_="product_title").span.a.get_text(strip=True)
    release_date = game_info.find("div", class_="content_head").find(
        "div", class_="product_data").ul.find("li", class_="release_data").find("span", class_="data").get_text(strip=True)
    main_img = game_info.find("div", class_="large_media").div.img["src"]
    genres = game_info.find("div", class_="summary_wrap").find("div", class_="section product_details").find(
        "div", class_="side_details").ul.find("li", class_="product_genre").find_all("span")
    # release_date = trans_RD(release_date)
    # genre = trans_genre(genre)
    for genre in range(len(genres)-1):
        print(genres[genre+1].string)
    return {'title': title, 'releaseDate': release_date, 'platform': platform, 'mainImg': main_img, 'link': f"https://www.metacritic.com{game_url}"}


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
        game_url = results[1].div.a["href"]
        game = extract_gmae(game_url)
        games.append(game)
    return games


def get_games(url):
    last_page = get_last_page(url)
    extract_games(last_page, url)


get_games(URL)
