from flask import Flask, jsonify, request, json
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)

app.config.from_pyfile('settings.py')

mysql = MySQL(app)
CORS(app, origins=["http://localhost:3000"])

#students
@app.route("/students/<id>", methods=["DELETE"])
def delete_students(id):
    if request.method == "DELETE":
        query = f"DELETE FROM student WHERE id={id}"

        cursor = mysql.connection.cursor()
        student_res = cursor.execute(query)
        print("RESPONSE", student_res)
        #checks
        student_res = mysql.connection.commit()
        cursor.close()

        print("RESPONSE", student_res)
        response = jsonify(student_res)
        return response


@app.route("/students", methods=["POST", "GET"])
def students():
    if request.method == "GET":
        db = mysql.connection.cursor()
        students = db.execute("""SELECT * FROM student""")

        students = db.fetchall()

        db.close()

        response = jsonify(students)
        print("RESPONSE", students)
        return response
    if request.method == "POST":
        data = json.loads(request.data)

        first_name = data['first_name']
        last_name = data['last_name']
        email = data["email"]
        dob = data['dob']

        query = f"INSERT INTO student (first_name, last_name, dob, email) VALUES('{first_name}', '{last_name}', '{dob}', '{email}');"
        cursor = mysql.connection.cursor()
        student_res = cursor.execute(query)
        #checks
        student_res = mysql.connection.commit()
        cursor.close()

        print("RESPONSE", student_res)
        response = jsonify(student_res)
        return response


#courses
@app.route("/courses", methods=["POST", "GET"])
def courses():
    if request.method == "GET":
        db = mysql.connection.cursor()
        courses = db.execute("""SELECT * FROM course""")

        courses = db.fetchall()
        
        db.close()

        print("RESPONSE", courses)
        response = jsonify(courses)
        return response
    if request.method == "POST":
        data = json.loads(request.data)
        name = data['name']

        query = f"INSERT INTO course (name) VALUES('{name}')"

        cursor = mysql.connection.cursor()
        course_res = cursor.execute(query)
        #checks
        course_res = mysql.connection.commit()
        cursor.close()

        print("RESPONSE", course_res)
        response = jsonify(course_res)
        return response


@app.route("/courses/<id>", methods=["DELETE"])
def delete_courses(id):
    if request.method == "DELETE":
        query = f"DELETE FROM course WHERE id={id}"

        cursor = mysql.connection.cursor()
        course_res = cursor.execute(query)
        #checks
        course_res = mysql.connection.commit()
        cursor.close()

        print("RESPONSE", course_res)
        response = jsonify(course_res)
        return response


#results
@app.route("/results", methods=["GET", "POST"])
def results():
    if request.method == "POST":
        data = json.loads(request.data)
        student = data['student']
        course = data["course"]
        score = data["score"]
        
        query = f"INSERT INTO result (student, course, score) VALUES('{student}', '{course}', '{score}')"

        cursor = mysql.connection.cursor()
        results_res = cursor.execute(query)
        #checks
        results_res = mysql.connection.commit()
        cursor.close()

        print("RESPONSE", results_res)
        response = jsonify(results_res)
        return response
    if request.method == "GET":
        db = mysql.connection.cursor()
        query = "SELECT * FROM result INNER JOIN student ON result.student = student.id INNER JOIN course ON result.course = course.id"
        results = db.execute(query)

        results = db.fetchall()
        print("RESULTS", results)

        db.close()

        print("RESPONSE", results)
        response = jsonify(results)
        return response


@app.route("/results/<id>", methods=["DELETE"])
def delete_results(id):
    if request.method == "DELETE":
        query = f"DELETE FROM result WHERE id={id}"

        cursor = mysql.connection.cursor()
        result_res = cursor.execute(query)
        #checks
        result_res = mysql.connection.commit()
        cursor.close()

        print("RESPONSE", result_res)
        response = jsonify(result_res)
        return response


if(__name__ == "__main__"):
    app.run()