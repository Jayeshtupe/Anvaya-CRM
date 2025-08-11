const express = require("express")
const router = express.Router()
const leadController = require("../controllers/leadController")

router.post("/", leadController.createLead)
router.get("/", leadController.getLeads)
router.patch("/:id", leadController.updateLead)
router.get("/:id", leadController.getLeadById)
router.delete("/:id", leadController.deleteLead)
module.exports = router