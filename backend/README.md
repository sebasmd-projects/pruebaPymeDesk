# BackEnd
This is the README file for the backend of the project, developed with Django and Django Rest Framework. Below you will find information on how to set up and configure the backend application.

## Prerequisites
[Python](https://www.python.org/) installed on your machine (project python versión 3.11.4).

## Getting Started
1. Clone the [repository](https://github.com/sebasmd-projects/pruebaPymeDesk) to your local machine.
2. Navigate to the `backend` directory
3. Create a virtual environment (optional but recommended) and activate it:
    ```bash
        python -m venv venvName
        source venvName/bin/activate  # For Linux/Mac
        venvName\Scripts\activate  # For Windows
    ```
4. Install the required packages by running the following command:
    ```bash
        pip install -r requirements.txt
    ```
5. Create a `.env` file in the root of the `backend` directory with the following content:
   ```bash
    DEBUG=True
    ALLOWED_HOSTS=localhost,127.0.0.1
    INTERNAL_IPS=localhost,127.0.0.1
    SECRET_KEY=same-as-next-secret-key
    CORS_ALLOWED_ORIGINS=http://127.0.0.1:3000,http://localhost:3000
   ```
    Adjust the values of ALLOWED_HOSTS, INTERNAL_IPS, and CORS_ALLOWED_ORIGINS as per your requirements.
6. Apply the database migrations:
   ```bash
    python manage.py migrate
   ```
7. Start the development server:
   ```bash
    python manage.py runserver
   ```
   You can start the development server on other ip and port with `python manage.py ip:port`:
   ```bash
    python manage.py 0.0.0.0:8000
   ```

## Endpoint
The backend API provides the following endpoints:

### GET Endpoints:
- `/api/orders/`
- `/api/orders/{id}/`
- `/api/products/`
- `/api/products/{id}/`
- `/api/summary/`
- `/api/users/`
- `/api/users/{id}/`
### POST Endpoints:
- `/api/orders/`
- `/api/products/`
- `/api/users/create/`
- `/api/token/`
- `/api/token/refresh/`
- `/api/token/verify/`
### PUT, PATCH and DELETE Endpoints:
- `/api/orders/{id}/`
- `/api/products/{id}/`
- `/api/users/{id}/`

### Note:
To see all the documentation of the APIs and test them, you can access the endpoint or with drf_yasg that generates the documentation with swagger at the URL `/api/docs/` or `/api/redocs/`

## Folder Structure
The folder structure of the backend app is as follows:
```lua
backend/
  |-- app_core/
  |     |-- __init__.py
  |     |-- asgi.py
  |     |-- serializers.py
  |     |-- settings.py
  |     |-- urls.py
  |     |-- views.py
  |     |-- wsgi.py
  |
  |-- apps/
  |     |-- orders/
  |     |     |-- api/
  |     |     |     |-- __init__.py
  |     |     |     |-- serializers.py
  |     |     |     |-- views.py
  |     |     |
  |     |     |-- migrations/
  |     |     |-- admin_resources.py
  |     |     |-- admin.py
  |     |     |-- apps.py
  |     |     |-- models.py
  |     |     |-- tests.py
  |     |     |-- views.py
  |     |
  |     |-- products/
  |     |     |-- api/
  |     |     |     |-- __init__.py
  |     |     |     |-- serializers.py
  |     |     |     |-- views.py
  |     |     |
  |     |     |-- migrations/
  |     |     |-- admin_resources.py
  |     |     |-- admin.py
  |     |     |-- apps.py
  |     |     |-- models.py
  |     |     |-- tests.py
  |     |     |-- views.py
  |     |
  |     |-- users/
  |     |     |-- api/
  |     |     |     |-- __init__.py
  |     |     |     |-- serializers.py
  |     |     |     |-- views.py
  |     |     |
  |     |     |-- migrations/
  |     |     |-- admin_resources.py
  |     |     |-- admin.py
  |     |     |-- apps.py
  |     |     |-- managers.py
  |     |     |-- models.py
  |     |     |-- tests.py
  |     |     |-- views.py
  |     |
  |
  |-- utils/
  |     |-- auth_backend.py
  |     |-- default_pagination.py
  |
  |-- .env
  |-- manage.py
  |-- requirements.txt
```

## Additional Notes
- The backend application uses `Django` and `Django Rest Framework` to build the REST API.
- The .env file contains environment variables required for the application to work properly. Make sure to update the values accordingly.
- The folder structure follows the standard Django project structure with separate apps for different functionalities (orders, products, users).
- The models described in the information provided are deployed in their respective application directories. To see its fields, you can access the `models.py` file of each application or in `/api/docs/` in the `models` section

If you have any further questions or issues, please don't hesitate to reach out.