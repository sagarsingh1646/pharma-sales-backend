# Pharmaceutical Sales Tracking System - Backend

Backend API for the **Pharmaceutical Sales Tracking System**, built with **Node.js, Express, and MongoDB**. Provides authentication, user management, and sales tracking and generate report functionality.

---

## Base URL
```
http://localhost:3000/api/v1/
```

---

## Authentication APIs

### 1. Signup
**Endpoint:** `POST /auth/signup`

**Request Body:**
```json
{
    "firstName": "Sagar",
    "lastName": "Singh",
    "email": "Sagar@pharma.com",
    "password": "xyz"
}
```

**Description:**
- Registers a new user.
- New users are treated as **Sales Representatives** by default.

---

### 2. Login
**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "sagar@pharma.com",
  "password": "xyz"
}
```

**Description:**
- Authenticates a user and returns a token for accessing protected endpoints.

---

## Sales APIs (Authorization Required)
Add the following header to all sales-related API requests:
```
Authorization: Bearer <token_received_from_login>
```

### 1. Create Sale
**Endpoint:** `POST /sales/create`

**Request Body:**
```json
{
  "productName": "Amoxicillin 250mg",
  "quantity": 30,
  "pricePerUnit": 5.0,
  "dateOfSale": "2025-09-25",
  "customerName": "Wellness Pharmacy",
  "customerEmail": "wellness@example.com"
}
```

### 2. Get Sales
**Endpoint:** `GET /sales/`
- Retrieve all sales transactions.

### 3. Update Sale
**Endpoint:** `PUT /sales/{id}`

**Request Body:**
```json
{
  "quantity": 60
}
```

### 4. Delete Sale
**Endpoint:** `DELETE /sales/{id}`
- Deletes the sale with the specified ID.

### 4. Generate Report
**Endpoint:** `GET /sales/report`
- Generate reports (Only for manager).

---

## Environment Variables (.env)
```env
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<anything_strong>
PORT=<available_port>
FRONTEND_URL=<frontend_base_url>
```

---

## Tech Stack
- **Backend:** Node.js, Express
- **Database:** MongoDB, Mongoose
- **Authentication & Security:** JWT, Passport, Bcrypt
- **Middleware & Utilities:** CORS, dotenv
- **Frontend Integration:** FRONTEND_URL environment variable for CORS and API calls

---

## Installation and Running

1. **Clone the repository**
```bash
git clone https://github.com/sagarsingh1646/pharma-sales-backend
cd pharma-sales-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file** (see example above)

4. **Run the server**
```bash
npm run dev
```
- The backend will be available at `http://localhost:3000/api/v1/`


## Deployed URL
[Backend base URL](https://pharma-sales-backend-v1.onrender.com/)
