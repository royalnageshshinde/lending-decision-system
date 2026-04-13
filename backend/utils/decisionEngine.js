const calculateDecision = ({ monthlyRevenue, loanAmount, tenure }) => {
  let score = 750;
  let reasons = [];

  const emi = loanAmount / tenure;
  const revenueToEmiRatio = monthlyRevenue / emi;
  const loanRevenueRatio = loanAmount / monthlyRevenue;

  if (revenueToEmiRatio < 2) {
    score -= 200;
    reasons.push("LOW_REVENUE");
  }

  if (loanRevenueRatio > 5) {
    score -= 150;
    reasons.push("HIGH_LOAN_RATIO");
  }

  if (tenure < 6 || tenure > 60) {
    score -= 100;
    reasons.push("RISKY_TENURE");
  }

  if (loanAmount > monthlyRevenue * 20) {
    score -= 250;
    reasons.push("DATA_INCONSISTENCY");
  }

  const decision = score >= 600 ? "Approved" : "Rejected";

  return { decision, score, reasons };
};

module.exports = calculateDecision;