/*const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");

// ✅ إنشاء مستخدم جديد (مفتوح للجميع)
router.post("/", userController.createUser);

// ✅ جلب جميع المستخدمين (يحتاج إلى تسجيل دخول)
router.get("/", verifyToken, isAdmin, userController.getUsers);

// ✅ جلب مستخدم واحد (يحتاج إلى تسجيل دخول)
router.get("/:id", verifyToken, userController.getUserById);

// ✅ تحديث بيانات المستخدم (يسمح للمستخدم نفسه أو الإداري بالتعديل)
router.put("/:id", verifyToken, async (req, res, next) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
    } else {
        return res.status(403).json({ message: "غير مصرح، يمكنك فقط تعديل حسابك الشخصي" });
    }
}, userController.updateUser);

// ✅ حذف المستخدم (يسمح فقط للإداري)
router.delete("/:id", verifyToken, isAdmin, userController.deleteUser);

module.exports = router;     */


const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/", userController.createUser);
router.get("/", userController.getUsers); // ❌ إزالة verifyToken مؤقتًا
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
