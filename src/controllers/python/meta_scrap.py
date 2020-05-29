import requests
from bs4 import BeautifulSoup
from multiprocessing import Pool
from operator import itemgetter
import time

URL = "https://www.metacritic.com/browse/games/release-date/available/pc/metascore"


def get_last_page(url):
    response = requests.get(url, headers={"User-Agent": "Mozilla"})
    soup = BeautifulSoup(response.text, "html.parser")
    pages = soup.find("div", class_="pages").find(
        "ul", class_="pages").find_all("li", class_="page")
    last_page = pages[-1].a.get_text(strip=True)
    return int(last_page)


def str_to_int(month):
    int_month = {
        'Jan': '01',
        'Feb': '02',
        'Mar': '03',
        'Apr': '04',
        'May': '05',
        'Jun': '06',
        'Jul': '07',
        'Aug': '08',
        'Sep': '09',
        'Oct': '10',
        'Nov': '11',
        'Dec': '12'
    }
    return int_month.get(month, "-*Not a vaild month value.*-")


def trans_RD(date):
    _date = date.split()
    year = _date[2]
    month = _date[0]
    day = _date[1].strip(',')
    month = str_to_int(month)
    if int(day) < 10:
        day = '0' + day
    date_id = year + month + day
    return date_id


def str_merge(strings):
    merged_str = ""
    for nth in range(len(strings)-1):
        if nth > 0:
            if strings[nth].string != strings[nth+1].string:
                merged_str += f", {strings[nth+1].string}"
        else:
            merged_str += strings[nth+1].string
    return merged_str


def extract_gmae(game_url):
    response = requests.get(
        f"https://www.metacritic.com{game_url}", headers={"User-Agent": "Mozilla"})
    soup = BeautifulSoup(response.text, "html.parser")
    game_info = soup.find("div", class_="left")
    title = game_info.find("div", class_="content_head").find(
        "div", class_="product_title").a.get_text(strip=True)
    platform = game_info.find("div", class_="content_head").find(
        "div", class_="product_title").span.a.get_text(strip=True)
    company = game_info.find("div", class_="content_head").find(
        "div", class_="product_data").ul.find("li", class_="publisher").find("span", class_="data").a.get_text(strip=True)
    release_date = game_info.find("div", class_="content_head").find(
        "div", class_="product_data").ul.find("li", class_="release_data").find("span", class_="data").get_text(strip=True)
    main_img = game_info.find("div", class_="large_media").div.img["src"]
    genres = game_info.find("div", class_="summary_wrap").find("div", class_="section product_details").find(
        "div", class_="side_details").ul.find("li", class_="product_genre").find_all("span")

    genres = str_merge(genres)

    release_date = trans_RD(release_date)

    return {'title': title, 'company': company, 'releaseDate': release_date, 'platform': platform, 'mainImg': main_img, 'genres': genres, 'link': f"https://www.metacritic.com{game_url}"}


def extract_games(last_page, url):
    games = []
    for page in range(1):  # last_page
        response = requests.get(f"{url}?page={page}",
                                headers={"User-Agent": "Mozilla"})
        soup = BeautifulSoup(response.text, "html.parser")
        results = soup.find_all("li", class_="game_product")
        for result in results:
            game_url = result.div.a["href"]
            game = extract_gmae(game_url)
            games.append(game)
        games = sorted(games, key=itemgetter('releaseDate'))
    return games


def games_print(games):
    print(games)


def get_games(url):
    last_page = get_last_page(url)
    start_time = time.time()
    # games_print(extract_games(last_page, url))
    if __name__ == '__main__':
        pool = Pool(processes=4)
        pool.map(games_print, extract_games(last_page, url))
    print("--- %s seconds ---" % (time.time() - start_time))


get_games(URL)
