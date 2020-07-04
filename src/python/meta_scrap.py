import requests
from bs4 import BeautifulSoup
from operator import itemgetter
import time
import json

URL = "https://www.metacritic.com/browse/games/score/metascore/all/pc"


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
    merged_str = []
    for nth in range(len(strings)-1):
        if nth > 0:  # 0번째 칸의 내용이 gendsr: 라고 필요없는 내용이라 그 이상부터 시작
            if strings[nth].string != strings[nth+1].string:
                merged_str.append(strings[nth+1].string)
        else:
            merged_str.append(strings[nth+1].string)
    return merged_str


def extract_gmae(game_url):
    response = requests.get(
        f"https://www.metacritic.com{game_url}", headers={"User-Agent": "Mozilla"})
    soup = BeautifulSoup(response.text, "html.parser")
    game_info = soup.select_one("div.left")

    title = game_info.select_one(
        "div.content_head > div.product_title > a").get_text(strip=True)
    platform = game_info.select_one(
        "div.content_head > div.product_title span > a").get_text(strip=True)
    company = game_info.select_one(
        "div.content_head > div.product_data > ul > li.publisher > span.data > a").get_text(strip=True)
    release_date = game_info.select_one(
        "div.content_head > div.product_data > ul > li.release_data > span.data").get_text(strip=True)
    main_img = game_info.select_one("div.large_media > div > img")['src']
    genres = game_info.select(
        "div.summary_wrap > div.section.product_details > div.side_details > ul > li.product_genre > span")

    genres = str_merge(genres)

    release_date = trans_RD(release_date)

    return {'title': title, 'company': company, 'releaseDate': release_date, 'platform': platform, 'mainImg': main_img, 'genres': genres, 'link': f"https://www.metacritic.com{game_url}"}


def extract_games(last_page, url):
    games = []
    for page in range(1):  # last_page
        response = requests.get(f"{url}?page={page}",
                                headers={"User-Agent": "Mozilla"})
        soup = BeautifulSoup(response.text, "html.parser")
        results = soup.select("td.clamp-image-wrap > a")
        # for result in results:
        game_url = results[0]["href"]
        game = extract_gmae(game_url)
        games.append(game)
        game_url = results[1]["href"]
        game = extract_gmae(game_url)
        games.append(game)
        game_url = results[2]["href"]
        game = extract_gmae(game_url)
        games.append(game)
        game_url = results[3]["href"]
        game = extract_gmae(game_url)
        games.append(game)
        game_url = results[4]["href"]
        game = extract_gmae(game_url)
        games.append(game)
        game_url = results[5]["href"]
        game = extract_gmae(game_url)
        games.append(game)
        game_url = results[6]["href"]
        game = extract_gmae(game_url)
        games.append(game)
        game_url = results[7]["href"]
        game = extract_gmae(game_url)
        games.append(game)
        game_url = results[8]["href"]
        game = extract_gmae(game_url)
        games.append(game)
        game_url = results[9]["href"]
        game = extract_gmae(game_url)
        games.append(game)
        game_url = results[10]["href"]
        game = extract_gmae(game_url)
        games.append(game)
        games = sorted(games, key=itemgetter('releaseDate'))
    return games


def games_print(games):
    print(json.dumps(games))


def get_games(url):
    last_page = get_last_page(url)
    # start_time = time.time()
    games_print(extract_games(last_page, url))
    # print("--- %s seconds ---" % (time.time() - start_time))


get_games(URL)
