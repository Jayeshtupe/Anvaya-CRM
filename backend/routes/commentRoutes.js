const express = require("express")
const router = express.Router()
const commentController = require("../controllers/commentController")

router.post("/leads/:id/comments", commentController.addComment)
router.get("/leads/:id/comments", commentController.getCommentsForLead);
router.delete("/leads/:leadId/comments/:commentId", commentController.deleteComment);

module.exports = router