import json
from unittest.mock import patch

import app
from tests import BMTestCase


class ApiTest(BMTestCase):
    def setUp(self):
        super().setUp()
        self.client = app.app.test_client()

    @patch("taskqueue.tasks.create_feed")
    @patch("taskqueue.tasks.create_messages")
    def test_add_user(self, mock_feed, mock_messages):
        user_data = {
            "first_name": "Larry",
            "last_name": "Smith",
            "image": "iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAYAAADn9T9+AAAAEElEQVR42mP8z/C/noEIAABgXwJ/paAXpgAAAABJRU5ErkJggg==",
            "keywords": {
                "name": 'hobby',
                "options": [
                    'Cooking',
                    'Cosplaying',
                ],
            }
        }
        res = self.client.post(
            "/api/users", data=json.dumps(user_data), content_type="application/json",
        )
        self.assertEqual(res.json["first_name"], "Larry")
        mock_feed.execute.assert_called_once()
        mock_messages.execute.assert_called_once()

    def test_get_messages(self):
        user = self._add_user()
        self._add_message_context(user)

        res = self.client.get(f"/api/messages/{user['id']}")
        self.assertEqual(res.status_code, 200)

        self.assertTrue(len(res.json), 1)

    def test_get_feed(self):
        user = self._add_user()
        self._add_feed_context(user)

        res = self.client.get(f"/api/feed/{user['id']}")
        self.assertEqual(res.status_code, 200)

        data = res.json
        self.assertTrue(len(data))
