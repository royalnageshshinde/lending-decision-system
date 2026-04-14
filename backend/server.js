const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const loanRoutes = require("./routes/loanRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many requests, please try again later",
  },
});

// ✅ Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/loan", limiter);

// ✅ Root route with DB ping (important for Render cold start)
app.get("/", async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: "Database not connected yet",
      });
    }

    await mongoose.connection.db.admin().ping();

    res.status(200).json({
      success: true,
      message: "Lending Decision API + DB is running",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database ping failed",
      error: error.message,
    });
  }
});

// ✅ Loan routes
app.use("/api/loan", loanRoutes);

// ✅ Start server only after DB connect
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  })
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });