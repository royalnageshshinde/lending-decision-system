const calculateDecision = ({
  monthlyRevenue,
  loanAmount,
  tenure,
}) => {
  const revenue = Number(monthlyRevenue);
  const loan = Number(loanAmount);
  const months = Number(tenure);

  let score = 750;
  const reasons = [];

  // ✅ Safe fallback
  if (!revenue || !loan || !months || months <= 0) {
    return {
      decision: "Rejected",
      score: 300,
      reasons: ["INVALID_INPUT"],
    };
  }

  const emi = loan / months;
  const revenueToEmiRatio = revenue / emi;
  const loanRevenueRatio = loan / revenue;

  if (revenueToEmiRatio < 2) {
    score -= 200;
    reasons.push("LOW_REVENUE");
  }

  if (loanRevenueRatio > 5) {
    score -= 150;
    reasons.push("HIGH_LOAN_RATIO");
  }

  if (months < 6 || months > 60) {
    score -= 100;
    reasons.push("RISKY_TENURE");
  }

  if (loan > revenue * 20) {
    score -= 250;
    reasons.push("DATA_INCONSISTENCY");
  }

  // ✅ Prevent negative score
  score = Math.max(score, 300);

  const decision = score >= 600 ? "Approved" : "Rejected";

  return { decision, score, reasons };
};

module.exports = calculateDecision;