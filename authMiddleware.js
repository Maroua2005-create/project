const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ✅ التحقق من التوكن (JWT)
const verifyToken = (req, res, next) => {
    try {
        // ✅ استخراج التوكن من الـ Authorization header
        const token = req.header("Authorization")?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "غير مصرح، لا يوجد توكن" });

        // ✅ التحقق من صحة التوكن
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // يحتوي على { id, isAdmin, ... }
        
        next();
    } catch (error) {
        res.status(401).json({ message: "التوكن غير صالح أو منتهي الصلاحية" });
    }
};

// ✅ التحقق مما إذا كان المستخدم إداريًا
const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "المستخدم غير موجود" });

        if (!user.isAdmin) return res.status(403).json({ message: "غير مصرح، هذه العملية مخصصة للإداريين فقط" });

        next();
    } catch (error) {
        res.status(500).json({ message: "خطأ في الخادم الداخلي" });
    }
};

module.exports = { verifyToken, isAdmin };
