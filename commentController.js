const Comment = require("../models/Comment");

// add comment to the website
const addComment = async (req, res) => {
    try {
        const { commenter_id, review } = req.body;
        if (!commenter_id) return res.status(400).json({ error: "User ID required" });
        if (!review) return res.status(400).json({ error: "Comment content required" });

        const newComment = new Comment({ commenter_id, review});
        await newComment.save();
        res.status(201).json({ message: "The comment has been added to the platform successfully", comment: newComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error:"Internal Server Error" });
    }
};

// get all comments 
const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ type: "platform" })
            .populate("commenter_id", "name email");

        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// ✅ تعديل تعليق معين
/*const updateComment = async (req, res) => {
    try {
        const { review } = req.body;
        const comment = await Comment.findById(req.params.id);
        
        if (!comment) return res.status(404).json({ error: "التعليق غير موجود" });

        comment.review = review || comment.review;
        await comment.save();

        res.json({ message: "تم تعديل التعليق بنجاح", comment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "خطأ في الخادم الداخلي" });
    }
};    */

// ✅ حذف تعليق معين
const deleteComment = async (req, res) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        if (!deletedComment) return res.status(404).json({ error: "The comment is not found" });

        res.json({ message: "Comment has been successfully deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    addComment,
    getComments,
    //updateComment,
    deleteComment
};