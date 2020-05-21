import requests
from bs4 import BeautifulSoup


def get_last_page(url):
    result = requests.get(url)
    soup = BeautifulSoup(result.text, "html.parser")
    pages = soup.find("div", class_="s-pagination").find_all("a")
    last_page = pages[-2].get_text(strip=True)
    return int(last_page)


def extract_job(job_html):
    title = job_html.find("div", class_="grid--cell fl1").h2.a["title"]
    company, location = job_html.find(
        "div", class_="fl1").h3.find_all("span", recursive=False)
    company = company.get_text(strip=True)
    location = location.get_text(strip=True).strip("-").strip("\r").strip("\n")
    job_id = job_html['data-jobid']
    return {'title': title, 'company': company, 'location': location, 'link': f"https://stackoverflow.com/jobs/{job_id}"}


def extract_jobs(last_page, url):
    jobs = []
    for page in range(last_page):
        print(f"Scrapping page {page}")
        result = requests.get(f"{url}&pg={page+1}")
        soup = BeautifulSoup(result.text, "html.parser")
        results = soup.find_all("div", class_="-job")
        for result in results:
            job = extract_job(result)
            jobs.append(job)
    return jobs


def get_jobs(word):
    url = f"https://stackoverflow.com/jobs?q={word}"
    last_page = get_last_page(url)
    jobs = extract_jobs(last_page, url)
    return jobs
