from flask import Flask, request
from flask_mysqldb import MySQL

app = Flask(__name__)

app.config.from_pyfile('settings.py')
 
mysql = MySQL(app)

#students
@app.route("/students", methods=["POST", "GET"])
def students():
    if request.method == "POST":
        first_name = request.form['firstName']
        last_name = request.form['lastName']
        email = request.form["email"]
        dob = request.form['dob']

        query = f"INSERT INTO student VALUES({first_name}, {last_name}, {dob}, {email})"

        cursor = mysql.connection.cursor()
        student_res = cursor.execute(query)
        #checks
        mysql.connection.commit()
        cursor.close()
        
        return student_res
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
        name = request.form['name']

        query = f"INSERT INTO course VALUES({name})"

        cursor = mysql.connection.cursor()
        course_res = cursor.execute(query)
        #checks
        mysql.connection.commit()
        cursor.close()

        return course_res
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
        student = request.form['student']
        course = request.form["course"]
        score = request.form["score"]
        
        query = f"INSERT INTO result VALUES({student}, {course}, {score})"

        cursor = mysql.connection.cursor()
        results_res = cursor.execute(query)
        #checks
        mysql.connection.commit()
        cursor.close()

        return results_res
    if request.method == "GET":
        db = mysql.connection.cursor()
        db.execute("""SELECT * FROM result""")

        results = db.fetchall()
        
        db.close()
        return str(results)


if(__name__ == "__main__"):
    app.run(debug=True)