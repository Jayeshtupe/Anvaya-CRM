const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController")

router.get("/closed-leads-by-agent", reportController.getClosedLeadsByAgent)
router.get("/lead-status-count", reportController.getLeadStatusCount)
router.get("/pipeline-summary", reportController.getPipelineSummary)
module.exports = router;
