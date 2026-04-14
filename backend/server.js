const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const loanRoutes = require("./routes/loanRoutes");

dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Debug env
console.log("Mongo URI loaded:", process.env.MONGO_URI ? "YES" : "NO");

// ✅ Rate limit
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many requests, please try again later",
  },
});

app.use(cors());
app.use(express.json());
app.use("/api/loan", limiter);

// ✅ Health route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Lending Decision API is running",
  });
});

app.use("/api/loan", loanRoutes);

// ✅ Stable local Mongo connect
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 20000,
    family: 4,
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