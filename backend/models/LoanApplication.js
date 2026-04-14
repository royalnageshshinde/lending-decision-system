const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema(
  {
    ownerName: {
      type: String,
      required: true,
      trim: true,
    },
    pan: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    businessType: {
      type: String,
      required: true,
      trim: true,
    },
    monthlyRevenue: {
      type: Number,
      required: true,
      min: 1,
    },
    loanAmount: {
      type: Number,
      required: true,
      min: 1,
    },
    tenure: {
      type: Number,
      required: true,
      min: 1,
    },
    purpose: {
      type: String,
      required: true,
      trim: true,
    },
    decision: {
      type: String,
      required: true,
      enum: ["Approved", "Rejected"],
    },
    creditScore: {
      type: Number,
      required: true,
    },
    reasons: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// ✅ IMPORTANT for audit trail speed
loanSchema.index({ createdAt: -1 });

module.exports = mongoose.model("LoanApplication", loanSchema);