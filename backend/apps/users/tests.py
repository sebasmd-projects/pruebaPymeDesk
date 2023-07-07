from django.test import TestCase
from django.contrib.auth import get_user_model

User = get_user_model()


class UserModelTestCase(TestCase):
    def setUp(self):
        self.user_data = {
            "username": "testuser",
            "email": "test@example.com",
            "password": "testpassword",
            "first_name": "John",
            "last_name": "Doe",
            "phone": "1234567890",
            "city": "New York",
            "address": "123 Test Street",
        }

    def test_user_creation(self):
        user = User.objects.create(**self.user_data)
        self.assertEqual(user.username, self.user_data["username"])
        self.assertEqual(user.email, self.user_data["email"])
        self.assertEqual(user.first_name, self.user_data["first_name"])
        self.assertEqual(user.last_name, self.user_data["last_name"])
        self.assertEqual(user.phone, self.user_data["phone"])
        self.assertEqual(user.city, self.user_data["city"])
        self.assertEqual(user.address, self.user_data["address"])
        self.assertIsNotNone(user.created)
        self.assertIsNotNone(user.updated)
        self.assertEqual(user.order, 1)

    def test_user_string_representation(self):
        user = User.objects.create(**self.user_data)
        expected_string = f"{user.id} - {user.first_name} {user.last_name}"
        self.assertEqual(str(user), expected_string)

    def test_user_save_method(self):
        user = User.objects.create(**self.user_data)
        user.first_name = "jane"
        user.last_name = "smith"
        user.username = "testuser2"
        user.save()
        self.assertEqual(user.first_name, "Jane")
        self.assertEqual(user.last_name, "Smith")
        self.assertEqual(user.username, "testuser2")
        self.assertEqual(user.updated.date(), user.created.date())

    def test_user_meta_options(self):
        self.assertEqual(User._meta.db_table, "apps_user")
        self.assertEqual(User._meta.verbose_name, "User")
        self.assertEqual(User._meta.verbose_name_plural, "Users")
        self.assertEqual(
            User._meta.ordering, ["order", "id", "first_name", "last_name"]
        )
        self.assertEqual(User._meta.get_field("email").blank, True)
        self.assertEqual(User._meta.get_field("first_name").max_length, 150)
        self.assertEqual(User._meta.get_field("last_name").max_length, 150)
