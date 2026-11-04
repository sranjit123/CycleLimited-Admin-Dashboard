# CycleLimited Admin Dashboard

A React-based admin dashboard for managing an online bicycle store. The dashboard includes pages for products, categories, users, orders, and profile information.

[**💻 Live Demo Website**](https://cycle-limited-admin-dashboard.vercel.app)

## Features

- Dashboard overview with summary cards and order status information
- Product management
- Category management
- User management
- Orders page using sample cart data from DummyJSON
- Login and protected routes
- Reusable layout and UI components

## Tech Stack

- React
- Vite
- Tailwind CSS
- React Router
- Lucide React
- JavaScript
- DummyJSON API
- Browser localStorage

## Project Structure

```text
Admin-Dashboard/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── data/
│   │   ├── categories.js
│   │   ├── orders.js
│   │   └── products.js
│   ├── layouts/
│   │   ├── AdminLayout.jsx
│   │   └── AuthLayout.jsx
│   ├── pages/
│   │   ├── auth/
│   │   ├── category/
│   │   ├── dashboard/
│   │   ├── orders/
│   │   ├── products/
│   │   ├── profile/
│   │   └── users/
│   ├── routes/
│   │   └── ProtectedRoute.jsx
│   ├── services/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── package.json
└── README.md
```

## Getting Started
Prerequisites
- Node.js
- npm
- Git

## Installation
1. Clone the repository:
   git clone https://github.com/sranjit123/CycleLimited-Admin-Dashboard.git
2. Move into the project directory:
   cd CycleLimited-Admin-Dashboard
3. Install the dependencies:
   npm install
4. Start the development server:
   npm run dev
5. Open the local URL shown in your terminal, usually http://localhost:5173.

## Data
Product, category, and sample order data are stored in the project's src/data files. The application also uses browser localStorage for some data.

The Orders page retrieves sample cart data from the DummyJSON API. This project does not currently use a production backend or database.

## Project Status
This project is a frontend admin dashboard built for learning and development. Authentication and data storage are not intended for production use.

## Future Improvements
- Connect a backend and database
- Add production-ready authentication and role-based access
- Connect orders to a real order management system
- Add automated tests
