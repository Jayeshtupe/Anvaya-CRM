const Lead = require("../models/lead.models")

exports.createLead = async (req, res) => {
    try {
        const lead = await Lead.create(req.body)
        res.status(201).json(lead)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

exports.getLeads = async(req, res) => {
    try {
        const lead = await Lead.find()
        .populate("salesAgent", "name email")
        .populate("tags", "name")
        if(!lead) {
            res.status(404).json({message: "Lead not found"})
        }
        res.json(lead)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.updateLead = async(req, res) => {
    try{
        const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runvalidators: true
        }).populate("salesAgent", "name email")

        if(!lead) {
            res.status(404).json({message: "Lead not found"})
        }

        res.json(lead)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
}

exports.deleteLead = async (req, res) => {
    try{
        const lead = await Lead.findByIdAndDelete(req.params.id)
        res.json(lead)
        if(!lead || lead.length === 0) {
            res.status(404).json({message: "Lead not found."})
        }
        res.status(200).json({message: "Lead deleted successfully"})
    } catch(error) {
        res.status(500).json({message: error.mesage})
    }
}


