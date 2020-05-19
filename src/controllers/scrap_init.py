
from scrapper import get_jobs

import sys

print sys.argv

# get_jobs('vue')

# db = {}


# @app.route("/")
# def home():
#     return render_template("potato.html")


# @app.route("/report")
# def report():
#     word = request.args.get('word')
#     if word:
#         word = word.lower()
#         existingJobs = db.get(word)
#         if existingJobs:
#             jobs = existingJobs
#         else:
#             jobs = get_jobs(word)
#             db[word] = jobs
#     else:
#         return redirect("/")
#     return render_template("report.html", searchingBy=word, resultsNumber=len(jobs), jobs=jobs)
