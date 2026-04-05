# Frontend Workspace - ShopMaster E-Commerce

This repository contains a React + Vite frontend for a storefront called **ShopMaster** and utility scripts used while integrating with a product API.

## Overview

The app provides:
- Product listing from a REST API
- Search using URL query parameters
- Category/price/sort filters
- Cart drawer with quantity management and total calculation
- Admin login (mock auth via localStorage)
- Admin dashboard for create/update/delete product operations
- Responsive layout using React Bootstrap

Primary frontend lives in `my-app/`.

## Tech Stack

- React 19
- Vite 7
- React Router
- React Bootstrap + Bootstrap 5
- React Bootstrap Icons
- ESLint 9

## Project Structure

```text
Frontend/
|- package.json                # workspace-level dependencies
|- test-backend.js             # API connectivity test script
|- my-app/                     # main React application
|  |- src/
|  |  |- component/
|  |  |  |- AdminPanel.jsx
|  |  |  |- CartDrawer.jsx
|  |  |  |- CreateProductForm.jsx
|  |  |  |- FooterItem.jsx
|  |  |  |- HeroItem.jsx
|  |  |  |- Home.jsx
|  |  |  |- Login.jsx
|  |  |  |- NavbarItem.jsx
|  |  |  |- ProductCard.jsx
|  |  |  |- ProductFilters.jsx
|  |  |- context/
|  |  |  |- CartContext.jsx
|  |  |- App.jsx
|  |  |- main.jsx
|  |- public/
|  |- package.json
|  |- vite.config.js
```

## Frontend Routes

Defined in `my-app/src/App.jsx`:
- `/` -> Home page with hero, filters, product grid
- `/login` -> Admin login
- `/admin` -> Protected admin dashboard (requires localStorage key `isAuthenticated=true`)

## Authentication (Current Behavior)

Authentication is mocked on the client side:
- Username: `admin`
- Password: `password`

Successful login sets `localStorage.isAuthenticated = "true"`.

## API Integration

Frontend currently targets:
- `https://backend-iody.onrender.com/api/product`

Used operations:
- `GET /api/product` (fetch products)
- `POST /api/product` (create product with `multipart/form-data`)
- `PUT /api/product/:id` (update product)
- `DELETE /api/product/:id` (delete product)

### Notes

- `CreateProductForm` sends image files as multipart form data.
- Product cards and cart logic expect `_id` as product identifier.

## Cart System

`CartContext` handles:
- Persisting cart in localStorage (`cartItems`)
- Add/remove/update quantity
- Total item count and price calculation
- Cart drawer open/close state

## Getting Started

### 1. Install dependencies

From the frontend app directory:

```bash
cd my-app
npm install
```

### 2. Run development server

```bash
npm run dev
```

Vite will print the local URL (typically `http://localhost:5173`).

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

## Linting

From `my-app/`:

```bash
npm run lint
```

## Backend Test Script

There is a helper script at workspace root:

- `test-backend.js`

It currently points to `http://localhost:4000/api/product` for quick API checks using `node-fetch`.

Run from workspace root:

```bash
npm install
node test-backend.js
```

If your API is not running locally, update `API_URL` in `test-backend.js`.

## Known Limitations

- Admin auth is client-side only (not secure for production).
- Some nav/footer links are placeholders (`#`).
- Checkout flow is UI-only and not connected to payment/order backend.

## Suggested Next Improvements

1. Replace mock login with real token-based authentication.
2. Add environment variables for API base URL.
3. Add loading/error states for all network calls.
4. Add unit and integration tests.
5. Add role-based route protection on server + client.
