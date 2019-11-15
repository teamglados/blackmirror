from flask import Flask, jsonify, abort, request, make_response, url_for
from webargs.flaskparser import parser
from webargs.core import ValidationError
from webargs.flaskparser import use_args

import error_msgs
import validation
from dal import user_dal


app = Flask(__name__)

@app.errorhandler(404)
def resource_not_found(e):
    return jsonify(error=str(e)), 404

@app.route("/api/users/<user_id>", methods=["GET"])
def get_user_by_id(user_id):
    try:
        user = user_dal.get(user_id)
    except TypeError as e:
        abort(404, description=f"{error_msgs.RESOURCE_NOT_FOUND} - {str(e)}")

    return jsonify(user)

@app.route("/api/users", methods=["POST"])
@use_args(validation.user_args)
def create_manifest(r_json):
    # TODO store the image
    image_id = None
    user = user_dal.add(r_json["first_name"], r_json["last_name"], r_json["github_user"], image_id)
    return jsonify(user), 201
