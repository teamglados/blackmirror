import os
import base64
from uuid import uuid4
from flask import (
    Flask,
    jsonify,
    abort,
    request,
    make_response,
    send_from_directory,
)

import utils
import error_msgs
import feed_service
import message_service
from taskqueue import tasks
from dal import user_dal
from dal import feed_dal
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

def store_base64_image(img_str: str) -> str:
    imgdata = base64.b64decode(img_str)
    filename = f'{utils.get_root_path()}/{UPLOAD_FOLDER}/{str(uuid4())}.jpg'
    with open(filename, 'wb') as f:
        f.write(imgdata)
    return filename

@app.route("/api/users", methods=["POST"])
def create_user():
    payload = request.json
    image = store_base64_image(payload["image"])
    user = user_dal.add(
        payload["first_name"], payload["last_name"], image, payload["keywords"]
    )

    # generate feed for user as bg task
    tasks.create_feed.execute(user["id"])
    # generate messages for user as bg task
    tasks.create_messages.execute(user["id"])
    return jsonify(user), 200


@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)


@app.route("/ping")
def ping():
    return "pong"


@app.route("/api/feed/<user_id>", methods=["GET"])
def get_user_feed(user_id: str):
    feed = feed_dal.get_by_user(user_id)
    feed_context = [f["context"] for f in feed]
    feed_sorted = sorted(feed_context, key=lambda x: x["post"]["content"]["timestamp_ms_created"], reverse=True)
    return jsonify(feed_sorted), 200


@app.route("/api/messages/<user_id>", methods=["GET"])
def get_user_messages(user_id: str):
    messages = message_dal.get_by_user(user_id)
    return jsonify(messages["context"]["messages"]), 200

