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
      purpose,
    } = req.body;

    // ✅ Required field validation
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
        message: "All required fields are mandatory",
      });
    }

    // ✅ PAN validation
    if (!validatePAN(pan)) {
      return res.status(400).json({
        success: false,
        message: "Invalid PAN format. Example: ABCDE1234F",
      });
    }

    // ✅ Positive values validation
    if (monthlyRevenue <= 0 || loanAmount <= 0 || tenure <= 0) {
      return res.status(400).json({
        success: false,
        message: "Revenue, loan amount, and tenure must be positive numbers",
      });
    }

    // ✅ Fast decision logic
    const result = calculateDecision({
      monthlyRevenue,
      loanAmount,
      tenure,
    });

    // ✅ Save lean payload only
    const savedApplication = await LoanApplication.create({
      ownerName,
      pan,
      businessType,
      monthlyRevenue,
      loanAmount,
      tenure,
      purpose,
      decision: result.decision,
      creditScore: result.score,
      reasons: result.reasons,
    });

    // ✅ Lightweight response
    return res.status(201).json({
      success: true,
      message: "Loan processed successfully",
      data: {
        id: savedApplication._id,
        decision: savedApplication.decision,
        creditScore: savedApplication.creditScore,
        reasons: savedApplication.reasons,
      },
    });
  } catch (error) {
    console.error("Loan processing error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ✅ BONUS FEATURE → Audit Trail optimized
exports.getAuditTrail = async (req, res) => {
  try {
    const logs = await LoanApplication.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return res.status(200).json({
      success: true,
      count: logs.length,
      data: logs,
    });
  } catch (error) {
    console.error("Audit trail error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch audit logs",
    });
  }
};