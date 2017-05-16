from locust import HttpLocust, TaskSet
from faker import Factory

fake = Factory.create()

def create(l):
    l.client.post("/todos", {
        "title": fake.test(max_nb_chars=140),
        "completed": "false" })


def read(l):
    l.client.get("/todos")

class UserBehavior(TaskSet):
    tasks = { read:5, create:1 }

    def on_start(self):
        read(self)

class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    min_wait = 3000
    max_wait = 6000
