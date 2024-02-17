from flask import Flask, request

app = Flask(__name__)


#students
@app.route("/students", methods=["POST", "GET"])
def students():
    if request.method == "POST":
        return "post students"
    if request.method == "GET":
        return "get students"

#courses
@app.route("/courses", methods=["POST", "GET"])
def courses():
    if request.method == "POST":
        return "post courses"
    if request.method == "GET":
        return "get courses"


#results
@app.route("/results", methods=["GET", "POST"])
def results():
    if request.method == "POST":
        return "post results "
    if request.method == "GET":
        return "get results "


if(__name__ == "__main__"):
    app.run(debug=True)