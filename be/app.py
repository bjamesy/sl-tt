from flask import Flask, request
from flask_mysqldb import MySQL

app = Flask(__name__)

app.config.from_pyfile('settings.py')
 
mysql = MySQL(app)

#students
@app.route("/students", methods=["POST", "GET"])
def students():
    if request.method == "POST":
        return "post students"
    if request.method == "GET":
        db = mysql.connection.cursor()
        db.execute("""SELECT * FROM student""")

        students = db.fetchall()

        db.close()

        return str(students)

#courses
@app.route("/courses", methods=["POST", "GET"])
def courses():
    if request.method == "POST":
        return "post courses"
    if request.method == "GET":
        db = mysql.connection.cursor()
        db.execute("""SELECT * FROM course""")

        courses = db.fetchall()
        
        db.close()
        return str(courses)


#results
@app.route("/results", methods=["GET", "POST"])
def results():
    if request.method == "POST":
        return "post results "
    if request.method == "GET":
        db = mysql.connection.cursor()
        db.execute("""SELECT * FROM result""")

        results = db.fetchall()
        
        db.close()
        return str(results)


if(__name__ == "__main__"):
    app.run(debug=True)