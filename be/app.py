from flask import Flask, jsonify, request, json, abort, make_response
from flask_mysqldb import MySQL
from flask_cors import CORS
import os 

app = Flask(__name__)

app.config.from_pyfile('settings.py')

mysql = MySQL(app)

CORS(app, origins=[os.environ.get("CLIENT_URL")])

#students
@app.route("/students/<id>", methods=["DELETE"])
def delete_students(id):
    try: 
        if request.method == "DELETE":
            if student_res is None:
                abort(400, "Insufficient fields")

            query = f"DELETE FROM student WHERE id={id}"

            cursor = mysql.connection.cursor()
            student_res = cursor.execute(query)
            if student_res == 0:
                abort(400, "Not Deleted")

            student_res = mysql.connection.commit()
            cursor.close()

            print("RESPONSE", student_res)
            response = jsonify(student_res)
            return response
    except Exception as e: 
        print("error: ", e)
        response = make_response(
            jsonify({ "Error": "Invalid request" }),
            400
        )
        return response


@app.route("/students", methods=["POST", "GET"])
def students():
    try: 
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
            if first_name is None or last_name is None or email is None or dob is None:
                abort(400, "Insufficient fields")

            query = f"INSERT INTO student (first_name, last_name, dob, email) VALUES('{first_name}', '{last_name}', '{dob}', '{email}');"
            cursor = mysql.connection.cursor()
            student_res = cursor.execute(query)
            if student_res == 0:
                abort(400, "Not Created")

            student_res = mysql.connection.commit()
            cursor.close()

            print("RESPONSE", student_res)
            response = jsonify(student_res)
            return response
    except Exception as e:
        print("error: ", e)
        response = make_response(
            jsonify({ "Error": "Invalid request" }),
            400
        )
        return response


#courses
@app.route("/courses", methods=["POST", "GET"])
def courses():
    try:
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
            if name is None:
                abort(400, "Insufficient fields")

            query = f"INSERT INTO course (name) VALUES('{name}')"

            cursor = mysql.connection.cursor()
            course_res = cursor.execute(query)
            if course_res == 0:
                abort(400, "Not Created")

            course_res = mysql.connection.commit()
            cursor.close()

            print("RESPONSE", course_res)
            response = jsonify(course_res)
            return response
    except Exception as e: 
        print("error: ", e)
        response = make_response(
            jsonify({ "Error": "Invalid request" }),
            400
        )
        return response


@app.route("/courses/<id>", methods=["DELETE"])
def delete_courses(id):
    try:
        if request.method == "DELETE":
            if id is None:
                abort(400, "Insufficient fields")

            query = f"DELETE FROM course WHERE id={id}"

            cursor = mysql.connection.cursor()
            course_res = cursor.execute(query)
            if course_res == 0:
                abort(400, "Not Deleted")
            #checks
            course_res = mysql.connection.commit()
            cursor.close()

            print("RESPONSE", course_res)
            response = jsonify(course_res)
            return response
    except Exception as e: 
        print("error: ", e)
        response = make_response(
            jsonify({ "Error": "Invalid request" }),
            400
        )
        return response


#results
@app.route("/results", methods=["GET", "POST"])
def results():
    try: 
        if request.method == "POST":
            data = json.loads(request.data)
            student = data['student']
            course = data["course"]
            score = data["score"]
            if student is None or data is None or course is None or score is None:
                abort(400, "Insufficient fields")

            query = f"INSERT INTO result (student, course, score) VALUES('{student}', '{course}', '{score}')"

            cursor = mysql.connection.cursor()
            results_res = cursor.execute(query)
            if results_res == 0:
                abort(400, "Not Created")

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

            db.close()

            print("RESPONSE", results)
            response = jsonify(results)
            return response
    except Exception as e:
        print("error: ", e)
        response = make_response(
            jsonify({ "Error": "Invalid request" }),
            400
        )
        return response


@app.route("/results/<id>", methods=["DELETE"])
def delete_results(id):
    try:
        if request.method == "DELETE":
            if id is None:
                abort(400, "Insufficient fields")
            query = f"DELETE FROM result WHERE id={id}"

            cursor = mysql.connection.cursor()
            result_res = cursor.execute(query)
            if result_res == 0:
                abort(400, "Not Deleted")

            result_res = mysql.connection.commit()
            cursor.close()

            print("RESPONSE", result_res)
            response = jsonify(result_res)
            return response
    except Exception as e:
        print("error: ", e)
        response = make_response(
            jsonify({ "Error": "Invalid request" }),
            400
        )
        return response


if(__name__ == "__main__"):
    app.run()