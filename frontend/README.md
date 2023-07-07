# FrontEnd
This is the README file for the frontend of the project. Below you will find information on how to set up and configure the frontend application.

## Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.
- [Yarn](https://yarnpkg.com/) package manager installed on your machine.

## Getting Started
1. Clone the [repository](https://github.com/sebasmd-projects/pruebaPymeDesk) to your local machine.
2. Navigate to the `frontend` directory
3. Install the dependencies by running the following command:
   ```bash
    yarn install
   ```
4. Create a `.env.local` file in the root of the frontend directory with the following content:
   ```bash
    NEXT_PUBLIC_BACKEND_URL=127.0.0.1:8000
    SECRET_KEY=same-as-django-secret-key
   ```
   Replace the values for NEXT_PUBLIC_BACKEND_URL and SECRET_KEY with the appropriate values for your environment.
5. Start the development server:
   ```bash
    yarn dev
   ```
   Note:
   You can configure the package.json to run dev server in another ip:
   ```bash 
    ...
    "scripts": {
    "dev": "set HOST=IPV4 && next dev -p 3000",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
    },
    ...
   ```
6. Open your browser and visit `http://localhost:3000` or the dev config ip to see the application.

## Folder Structure
The folder structure of the frontend application is as follows:
```lua 
frontend/
  |-- public/
  |     |-- favicon.ico
  |     |-- next.svg
  |     |-- no-image.png
  |     |-- vercel.svg
  |
  |-- src/
  |     |-- components/
  |     |     |-- ui/
  |     |     |     |-- navbar/
  |     |     |     |     |-- lgMainMenu.jsx
  |     |     |     |     |-- navbar.jsx
  |     |     |     |     |-- navbar.module.css
  |     |     |     |     |-- pagesList.jsx
  |     |     |     |     |-- smMainMenu.jsx
  |     |     |     |     |-- userMenu.jsx
  |     |     |
  |     |     |-- utils/
  |     |     |     |-- active_link/
  |     |     |     |     |-- activeLink.jsx
  |     |     |     |     |-- activeLink.module.css
  |     |     |     |     |-- activeUser.jsx
  |     |
  |     |-- pages/
  |     |     |-- accounts/
  |     |     |     |-- login/
  |     |     |     |     |-- index.jsx
  |     |     |     |     |-- login.module.css
  |     |     |     |
  |     |     |     |-- logout/
  |     |     |     |     |-- index.jsx
  |     |     |
  |     |     |-- api/
  |     |     |     |-- checkvalidtoken.jsx
  |     |     |     |-- login.jsx
  |     |
  |     |     |-- clients/
  |     |     |     |-- [id]/
  |     |     |     |     |-- index.jsx
  |     |     |     |-- components/
  |     |     |     |     |-- clientsTable.jsx
  |     |     |     |-- newclient/
  |     |     |     |     |-- components/
  |     |     |     |     |     |-- createClient.jsx
  |     |     |     |     |-- index.jsx
  |     |     |     |-- index.jsx
  |     |
  |     |     |-- home/
  |     |     |     |-- cityCardSummaryInfo.jsx
  |     |     |     |-- incomeBarChart.jsx
  |     |     |     |-- ordersClientsDourghnutChart.jsx
  |     |     |     |-- productCardSummaryInfo.jsx
  |     |     |     |-- salesLineChart.jsx
  |     |
  |     |     |-- orders/
  |     |     |     |-- [id]/
  |     |     |     |     |-- index.jsx
  |     |     |     |-- components/
  |     |     |     |     |-- ordersTable.jsx
  |     |     |     |-- index.jsx
  |     |
  |     |     |-- _app.jsx
  |     |     |-- _document.jsx
  |     |     |-- index.jsx
  |     |     |-- layout.jsx
  |
  |-- styles/
  |     |-- globals.css
  |     |-- layout.module.css
  |     |
  |-- .env.local
  |-- README.md
```

## Additional Notes
- The frontend application uses Next.js framework for server-side rendering and React for building user interfaces.

- The `.env.local` file contains environment variables that need to be set for the application to work properly. Make sure to update the values accordingly.