# DMCU Full Stack Project

This project has been separated into two clean, independent applications: a Next.js Frontend and a Node.js Backend.

## Folder Structure

* `/DMCU-Frontend` - The Next.js 15 App Router application with TailwindCSS, Framer Motion, and Three.js.
* `/DMCU-Backend` - The Node.js, Express, and MongoDB backend with authentication and file uploads.

## Prerequisites

- Node.js (v18+)
- MongoDB (Local or Atlas)

---

## 1. DMCU Backend Setup

The backend powers the API, database, and asset storage.

1. Navigate to the backend directory:
   ```bash
   cd DMCU-Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup Environment Variables:
   Ensure you have a `.env` file in the `DMCU-Backend` directory with the following variables:
   ```env
   PORT=5001
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLIENT_URL=http://localhost:3000
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   *The backend will be running on `http://localhost:5001`.*

---

## 2. DMCU Frontend Setup

The frontend is the visually stunning user interface for the DMCU.

1. Navigate to the frontend directory:
   ```bash
   cd DMCU-Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Setup Environment Variables:
   Ensure you have a `.env.local` file in the `DMCU-Frontend` directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5001
   ```
   *(Update the URL to match your backend port or deployed URL).*

4. Run the development server:
   ```bash
   npm run dev
   ```
   *The frontend will be running on `http://localhost:3000`.*

---

## Architecture & Features

- **Frontend**: Next.js App Router, dynamic theming via Context API, Tailwind CSS with dynamic CSS variables, 3D GLB model rendering using `@react-three/fiber`, and complex animated page transitions.
- **Backend**: Express REST API, MongoDB/Mongoose, JWT Authentication for admin dashboard, Multer for image and 3D model uploads, centralized error handling.
# DMCU
