from tests import BMTestCase
from taskqueue import tasks
from dal import github_dal

class BMQueueTest(BMTestCase):
    def test_queueu(self):
        username = "PasiTheGreat"
        self._add_github_user(username=username)
        ref = tasks.update_github_stats.execute(username)
        if not ref.wait(5):
            raise AssertionError("Taskqueue is not operational")

    def test_store_github_data(self):
        username = "Villux"
        self._add_github_user(username=username)
        old_github_stats = github_dal.get(username)

        tasks.update_github_stats.function(username)
        github_stats = github_dal.get(username)
        # TODO hacky test, but time is limited
        self.assertNotEqual(old_github_stats["timestamp_ms_updated"], github_stats["timestamp_ms_updated"])
