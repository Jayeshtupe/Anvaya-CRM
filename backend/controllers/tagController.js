const Tag = require("../models/tag.models")

exports.createTag = async (req, res) => {
    try {
        const tag = await Tag.create(req.body)
        res.status(201).json({message: "Tag created Successfully", tag})
    } catch(error){
        res.status(500).json({message: error.message})
    }
}

exports.getTags = async (req, res) => {
    try {
        const tag = await Tag.find()
        if(!tag || tag.length === 0) {
            res.status(404).json({message: "Tags not found"})
        }
        res.json(tag)
    } catch(error) {
        res.status(500).json({message: error.message})
    }
}