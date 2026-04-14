# Lending Decision System

A full-stack **MSME Lending Decision System** built with **React,
Node.js, Express, and MongoDB Atlas**.

## 🚀 Features

-   Professional MSME loan application UI matching assignment screenshot
-   PAN validation and input sanitization
-   Loan eligibility decision engine
-   Credit score generation
-   Approval / rejection with reasons
-   MongoDB Atlas storage
-   Audit trail endpoint
-   Rate limiting for API protection
-   Render backend + Netlify frontend deployment ready

## 🛠️ Tech Stack

-   Frontend: React + Vite + Tailwind CSS + Axios
-   Backend: Node.js + Express
-   Database: MongoDB Atlas + Mongoose
-   Deployment: Netlify (frontend), Render (backend)

## 📂 Project Structure

-   `frontend/` → React UI
-   `backend/` → Express API
-   `models/` → Loan schema
-   `controllers/` → Business logic
-   `utils/` → Decision engine
-   `routes/` → API routes

## ⚙️ API Endpoints

-   `POST /api/loan/apply`
-   `GET /api/loan/audit`

## 🧠 Decision Logic

The system evaluates: - Revenue to EMI ratio - Loan to revenue ratio -
Risky tenure - Data inconsistency checks

## 🌐 Live Links

-   Frontend: Netlify deployed link: https://lending-decision-system-4.netlify.app/
-   Backend: Render deployed link: https://lending-decision-system-4-lwpl.onrender.com
-   Database: MongoDB Atlas

## 👨‍💻 Improvements Done

-   Optimized MongoDB schema with indexing
-   Improved UI to exact screenshot layout
-   Fixed `.env` and local run issues
-   Reduced timeout problems by simplifying local-first flow
-   Added health route and validation
