const express = require("express")
const router = express.Router()
const agentController = require("../controllers/agentController")

router.post("/", agentController.createSalesAgent)
router.get("/", agentController.getAgents)
router.delete("/:id", agentController.deleteAgent)

module.exports = router