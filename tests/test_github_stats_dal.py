import time
from tests import BMTestCase
from dal import github_dal


class GithubStatsDalTest(BMTestCase):
    def setUp(self):
        super().setUp()

    def test_add(self):
        username = "test_user"
        self._add_github_user(username=username)

        self._update_githut_stats(username)
        updated_stats = github_dal.get(username)
        # TODO hacky test, but time is limited
        self.assertTrue("first_name" in updated_stats)
