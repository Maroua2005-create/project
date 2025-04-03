const express = require("express");
const router = express.Router();
const { 
    addComment,  
    getComments, 
    // updateComment, 
    deleteComment 
} = require("../controllers/commentController");

router.post("/comment", addComment);
router.get("/comment", getComments);
// router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

module.exports = router;