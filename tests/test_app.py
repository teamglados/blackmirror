import json
import app
import error_msgs
from tests import BMTestCase


class ApiTest(BMTestCase):
    def setUp(self):
        super().setUp()
        self.client = app.app.test_client()

    def test_add_user(self):
        user_data = {
            "first_name": "Larry",
            "last_name": "Smith",
            "github_user": "Villux"
        }
        res = self.client.post(
            "/api/users",
            data=json.dumps(user_data),
            content_type="application/json",
        )
        import pdb; pdb.set_trace()
        self.assertEqual(res.json["first_name"], "Larry")