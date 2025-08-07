const SalesAgent = require("../models/agent.models")

exports.createSalesAgent = async (req, res) => {
    try{
        const agent = await SalesAgent.create(req.body)
        res.status(201).json(agent)
    } catch(error) {
        res.json(400).json({message: "Error while adding SalesAgent."})
    }
}

exports.getAgents = async (req, res) => {
    try{
        const agent = await SalesAgent.find()
        res.json(agent)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
}

exports.deleteAgent = async (req, res) => {
    try{
        const agent = await SalesAgent.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "Sales agent deleted successfully"})
    } catch(error) {
        res.status(500).json({message: error.message})
    }
}
