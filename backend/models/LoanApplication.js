const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
  ownerName: String,
  pan: String,
  businessType: String,
  monthlyRevenue: Number,
  loanAmount: Number,
  tenure: Number,
  purpose: String,
  decision: String,
  creditScore: Number,
  reasons: [String]
}, { timestamps: true });

module.exports = mongoose.model("LoanApplication", loanSchema);