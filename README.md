Lending Decision System for MSMEs
📌 Project Overview

This project is a full-stack MSME Lending Decision System built as per the assignment requirements. It allows business owners to submit loan applications and receive an instant lending decision based on rule-based credit heuristics.

The system evaluates applicant data such as monthly revenue, requested loan amount, tenure, and PAN details to generate:

Binary decision: Approved / Rejected
Credit score
reason codes
Audit trail logs

🛠️ Tech Stack
1)Frontend
  React (Vite)
  Tailwind CSS
  Axios
  React Toastify
2)Backend
  Node.js
  Express.js
  MongoDB Atlas
  Mongoose
  Express Rate Limit
3)Deployment
  Frontend: Render Static Site
  Backend: Render Web Service

✨ Features Implemented
   MSME loan application form
   PAN validation (ABCDE1234F)
   Credit decision engine
   Risk reason generation
   Credit score generation
   MongoDB persistence
   Audit trail API
   Input validation
   Rate limiting
   Responsive premium UI
   Live deployment

🧠 Decision Logic

The decision engine uses deterministic rules:

1) Revenue to EMI Ratio
EMI = loanAmount / tenure
If revenue / EMI < 2
➜ LOW_REVENUE
2) Loan to Revenue Ratio
If loanAmount / monthlyRevenue > 5
➜ HIGH_LOAN_RATIO
3) Tenure Risk
If tenure < 6 OR tenure > 60
➜ RISKY_TENURE
4) Fraud / Data Inconsistency
If loanAmount > monthlyRevenue × 20
➜ DATA_INCONSISTENCY
Final Decision
No reason codes → Approved
One or more reasons → Rejected

📡 API Documentation
Apply Loan
POST /api/loan/apply

1)Request Body
{
  "ownerName": "Nagesh Shinde",
  "pan": "ABCDE1234F",
  "businessType": "Retail",
  "monthlyRevenue": 100000,
  "loanAmount": 200000,
  "tenure": 12,
  "purpose": "Inventory"
}
2)Response
{
  "success": true,
  "message": "Loan processed successfully",
  "data": {
    "decision": "Approved",
    "creditScore": 750,
    "reasons": []
  }
}

Audit Trail
GET /api/loan/audit
Returns all submitted loan applications.

⚙️ Local Setup
1) Clone
    git clone https://github.com/royalnageshshinde/lending-decision-system.git
    cd lending-decision-system
2) Backend
    cd backend
    npm install
    npm run dev
3) Frontend
    cd frontend
    npm install
    npm run dev

🔐 Environment Variables
   Backend .env
    MONGO_URI=your_mongodb_atlas_connection_string
    PORT=5000
   Frontend env (deployment)
    VITE_API_URL=https://lending-decision-system-xosz.onrender.com

🌐 Live Deployment
Backend: https://lending-decision-system-xosz.onrender.com
Frontend: Add your Render static site URL here
GitHub: https://github.com/royalnageshshinde/lending-decision-system
