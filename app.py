from flask import Flask, redirect, url_for, render_template, abort, request, Response
import pysondb

db = pysondb.db.getDb("db.json")
app = Flask(__name__)

@app.route("/")
def root():
    ret = db.getAll()
    
    return render_template("root.html", recipe_list = [r["name"] for r in ret])

@app.route("/add", methods=["GET", "POST"])
def add_recipe():
    # Handle a submitted recipe if recieved, otherwise provide form.
    if (request.method == "POST"):
        if request.is_json:
            db.add(request.json)
            return Response("", status=201)
        else:
            abort(500)
    else:
        return render_template("add.html")

@app.route("/recipe/<string:name>")
def show_recipe(name):
    ret = db.getByQuery({"name": name})
    if (len(ret) > 0):
        return render_template("recipe.html", recipe=ret[0])
    else:
        abort(404)

if (__name__ == "__main__"):
    app.run(debug = True, host="0.0.0.0")