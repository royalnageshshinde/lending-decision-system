const express = require("express");
const router = express.Router();
const {
  applyLoan,
  getAuditTrail
} = require("../controllers/loanController");

router.post("/apply", applyLoan);
router.get("/audit", getAuditTrail);

module.exports = router;