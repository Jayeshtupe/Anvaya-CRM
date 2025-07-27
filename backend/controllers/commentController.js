const mongoose = require("mongoose");
const Comment = require("../models/comment.models");
const Lead = require("../models/lead.models");
const SalesAgent = require("../models/agent.models");
// const { response } = require("express");

exports.addComment = async (req, res) => {
    try {
        const { author, commentText } = req.body;
        const leadId = req.params.id;

        const lead = await Lead.findById(leadId);
        if (!lead) {
            return res.status(404).json({ error: `Lead with ID '${leadId}' not found.` });
        }

        const agent = await SalesAgent.findById(author)
        if(!agent) {
            return res.status(404).json({error: `Sales agent with ID '${author}' not found.`})
        }

          if (!commentText || typeof commentText !== "string") {
            return res.status(400).json({ error: "commentText is required and must be a string." });
        }

        const newComment = await Comment.create({
           lead: leadId,
           commentText,
           author
        });

        return res.status(201).json({
            id: newComment._id,
            commentText: newComment.commentText,
            author: agent.name,
            createdAt: newComment.createdAt
        });

        

    } catch (error) {
        console.error(error.message)
        res.status(500).json({ message: error.message });
    }
};

exports.getCommentsForLead = async (req, res) => {
    try {
        const leadId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(leadId)) {
            return res.status(400).json({ error: "Invalid lead ID." });
        }

        const lead = await Lead.findById(leadId);
        if (!lead) {
            return res.status(404).json({ error: `Lead with ID '${leadId}' not found.` });
        }

        const comments = await Comment.find({ lead: leadId })
            .sort({ createdAt: -1 })
            .populate("author", "name");

        return res.status(200).json(
            comments.map(comment => ({
                id: comment._id,
                commentText: comment.commentText,
                author: comment.author.name,
                createdAt: comment.createdAt
            }))
        );

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
};

// In comment.controllers.js

exports.deleteComment = async (req, res) => {
  try {
    const { leadId, commentId } = req.params;

    const lead = await Lead.findById(leadId);
    if (!lead) {
      return res.status(404).json({ error: `Lead with ID '${leadId}' not found.` });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: `Comment with ID '${commentId}' not found.` });
    }

    await Comment.findByIdAndDelete(commentId);

    return res.status(200).json({ message: "Comment deleted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

