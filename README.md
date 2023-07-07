# PymeDesk Technical Test
This is the README file for the technical test. 

Here, we will build a simplified application for order and customer management for a commerce platform. 
The application will consist of a REST API built with ***Django*** and ***Django Rest Framework***.

We will use the default Django database ***(SQLite)***, and you can create the necessary models for the application. As a requirement, the following information should be stored for each order in the database.

The API should expose the following endpoints (data should be presented in JSON format):

1. `/orders`: Supports GET, POST, PUT, and DELETE operations for the orders stored in the database. Pagination and filtering options should be available based on the most important fields.
     - Order ID
     - Order date
     - Order status (pending, in transit, delivered, canceled)
     - Payment status (boolean value indicating whether the order has been paid)
     - Customer name
     - Customer phone number
     - Customer email
     - Customer address and city
     - Products in the order. For each product, the following information should be accessible:
       - Product ID
       - Product name
       - Product quantity
     - Shipping rule: home delivery or pickup
     - Observations
  
2. `/users`: Supports GET, POST, PUT, and DELETE operations for the customers stored in the database. Pagination and filtering options should be available based on the most important fields.
   
3. `/summary`: Provides metrics summarizing the commerce platform's performance. The following metrics should be exposed:
    - Number of orders
    - Number of customers
    - Income for the last month
    - City with the highest number of orders
    - Best-selling product

To visualize the information and perform operations in a user-friendly interface, we will build a web application using ***Next.js***. 

The application should have the following routes: 
   1. A homepage displaying summary metrics
   2. A view for orders
   3. A view for customers
   4. A view for creating a new customer. 

Note :

From the orders view, users should be able to see the details of each order, filter orders, and edit their status (e.g., pending, in transit, etc.). 

From the customers view, users should be able to see customer details and apply filters.

Since there are multiple routes, the website should include navigation mechanisms.