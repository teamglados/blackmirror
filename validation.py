from webargs import fields
from marshmallow import Schema, validate, validates_schema, ValidationError

user_args = {
    "first_name": fields.Str(required=True),
    "last_name": fields.Str(required=True),
    "github_user": fields.Str(required=True),
}
