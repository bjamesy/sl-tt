from flask import Flask, jsonify, request
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
        
        return jsonify(student_res)
    if request.method == "GET":
        db = mysql.connection.cursor()
        db.execute("""SELECT first_name, last_name, dob, email FROM student""")

        students = db.fetchall()

        db.close()

        print("RESPONSE", students)
        return jsonify(students)

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

        return jsonify(course_res)
    if request.method == "GET":
        db = mysql.connection.cursor()
        db.execute("""SELECT name FROM course""")

        courses = db.fetchall()
        
        db.close()

        print("RESPONSE", courses)
        return jsonify(courses)

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

        return jsonify(results_res)
    if request.method == "GET":
        db = mysql.connection.cursor()
        db.execute("""SELECT score FROM result""")

        results = db.fetchall()
        
        db.close()

        print("RESPONSE", results)
        return jsonify(results)


if(__name__ == "__main__"):
    app.run(debug=True)