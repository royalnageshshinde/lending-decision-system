const LoanApplication = require("../models/LoanApplication");
const calculateDecision = require("../utils/decisionEngine");

const validatePAN = (pan) => {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan);
};

exports.applyLoan = async (req, res) => {
  try {
    const {
      ownerName,
      pan,
      businessType,
      monthlyRevenue,
      loanAmount,
      tenure,
      purpose
    } = req.body;

    // Required field validation
    if (
      !ownerName ||
      !pan ||
      !businessType ||
      !monthlyRevenue ||
      !loanAmount ||
      !tenure ||
      !purpose
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields are mandatory"
      });
    }

    // PAN validation
    if (!validatePAN(pan)) {
      return res.status(400).json({
        success: false,
        message: "Invalid PAN format. Example: ABCDE1234F"
      });
    }

    // Negative values validation
    if (monthlyRevenue <= 0 || loanAmount <= 0 || tenure <= 0) {
      return res.status(400).json({
        success: false,
        message: "Revenue, loan amount, and tenure must be positive numbers"
      });
    }

    // Decision logic
    const result = calculateDecision({
      monthlyRevenue,
      loanAmount,
      tenure
    });

    // Save to MongoDB
    const newApplication = new LoanApplication({
      ownerName,
      pan,
      businessType,
      monthlyRevenue,
      loanAmount,
      tenure,
      purpose,
      decision: result.decision,
      creditScore: result.score,
      reasons: result.reasons
    });

    await newApplication.save();

    return res.status(201).json({
      success: true,
      message: "Loan processed successfully",
      data: newApplication
    });

  } catch (error) {
    console.error("Loan processing error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// BONUS FEATURE → Audit Trail
exports.getAuditTrail = async (req, res) => {
  try {
    const logs = await LoanApplication.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: logs.length,
      data: logs
    });

  } catch (error) {
    console.error("Audit trail error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch audit logs"
    });
  }
};