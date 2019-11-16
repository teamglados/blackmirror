import json
import app
from tests import BMTestCase


class ApiTest(BMTestCase):
    def setUp(self):
        super().setUp()
        self.client = app.app.test_client()

    def test_add_user(self):
        user_data = {
            "first_name": "Larry",
            "last_name": "Smith",
            "github_user": "Villux",
        }
        res = self.client.post(
            "/api/users", data=json.dumps(user_data), content_type="application/json",
        )
        self.assertEqual(res.json["first_name"], "Larry")

    def test_get_feed(self):
        user = self._add_user()
        self._create_realistic_feed(user["id"])

        res = self.client.get(f"/api/feed/{user['id']}")
        self.assertEqual(res.status_code, 200)

        feed_data = res.json
        self.assertEqual(len(feed_data["feed"][0]["comments"]), 1)
        self.assertEqual(len(feed_data["feed"][1]["comments"]), 2)
