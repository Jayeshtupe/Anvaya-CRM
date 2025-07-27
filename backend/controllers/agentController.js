const SalesAgent = require("../models/agent.models")

exports.createSalesAgent = async (req, res) => {
    try{
        const salesAgent = await SalesAgent.create(req.body)
        res.status(201).json(agent)
    } catch(error) {
        res.json(400).json({message: "Error while adding SalesAgent."})
    }
}

exports.getAgents = async (req, res) => {
    try{
        const agents = await SalesAgent.find()
        res.json(agents)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
}

