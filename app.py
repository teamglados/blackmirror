import os
from flask import (
    Flask,
    jsonify,
    abort,
    request,
    make_response,
    url_for,
    send_from_directory,
)
from werkzeug.utils import secure_filename
from webargs.flaskparser import parser
from webargs.core import ValidationError
from webargs.flaskparser import use_args

import error_msgs
import validation
import feed_service
import message_service
from taskqueue import tasks
from dal import user_dal
from dal import feeditem_dal
from dal import message_dal

UPLOAD_FOLDER = os.getenv("UPLOAD_FOLDER", "uploads")

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


@app.errorhandler(404)
def resource_not_found(e):
    return jsonify(error=str(e)), 404


@app.route("/api/users/<user_id>", methods=["GET"])
def get_user_by_id(user_id):
    try:
        user = user_dal.get(user_id)
    except TypeError as e:
        abort(404, description=f"{error_msgs.RESOURCE_NOT_FOUND} - {str(e)}")

    return jsonify(user), 200


@app.route("/api/users", methods=["POST"])
@use_args(validation.user_args)
def create_user(r_json):
    user = user_dal.add(
        r_json["first_name"], r_json["last_name"], r_json["github_user"]
    )

    # generate feed for user as bg task
    tasks.create_feed.execute(user["id"])
    # generate messages for user as bg task
    tasks.create_messages.execute(user["id"])
    return jsonify(user), 200


def store_image(file, user_id: str) -> str:
    if file.filename == "":
        raise ValueError("Filename missing!")
    filename = secure_filename(f"{user_id}_{file.filename}")
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)
    return filename


@app.route("/uploads", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        abort(400, description=f"{error_msgs.NO_FILE_IN_REQUEST}")
    try:
        if request.args.get("user"):
            user = request.args.get("userid")
            filename = store_image(request.files["file"], user)
            img_url_path = url_for("uploaded_file", filename=filename)
            user_dal.update_profile_pic(user, img_url_path)
        elif request.args.get("feed"):
            feed = request.args.get("feedid")
            filename = store_image(request.files["file"], feed)
            img_url_path = url_for("uploaded_file", filename=filename)
            feeditem_dal.update_image(feed, img_url_path)
        return "ok"
    except ValueError as e:
        abort(400, description=f"{error_msgs.NO_FILE_IN_REQUEST} - {str(e)}")


@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)


@app.route("/ping")
def ping():
    return "pong"


@app.route("/api/feed/<user_id>", methods=["GET"])
def get_user_feed(user_id: str):
    feed = feed_service.get_feed_for_user(user_id)
    return jsonify(feed), 200


@app.route("/api/messages/<user_id>", methods=["GET"])
def get_user_messages(user_id: str):
    messages = message_service.get_messages(user_id)
    return jsonify(messages), 200
