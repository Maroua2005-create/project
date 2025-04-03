const bcrypt = require("bcrypt");
const User = require("../models/User");

// Create a new user
const createUser = async (req, res) => {
    try {
        const { firstName, familyName, email, phoneNumber, town, region, password, pfp, isAdmin } = req.body;

        // Verify that all required fields are entered
        if (!firstName || !familyName || !email || !phoneNumber || !town || !region || !password) {
            return res.status(400).json({ error: "جميع الحقول مطلوبة" });
        }

// ✅ Verify that the email has not been used previously        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "البريد الإلكتروني مستخدم بالفعل" });
        }

        // ✅ تشفير كلمة المرور
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ إنشاء المستخدم الجديد
        const newUser = new User({
            firstName,
            familyName,
            email,
            phoneNumber,
            town,
            region,
            password: hashedPassword,
            pfp: pfp || "", // افتراضيًا، الصورة الشخصية تكون فارغة
            isAdmin: isAdmin || false
        });

        await newUser.save();

        res.status(201).json({ message: "تم إنشاء المستخدم بنجاح", user: { ...newUser._doc, password: undefined } });
    } catch (error) {
        console.error("خطأ أثناء إنشاء المستخدم:", error);
        res.status(500).json({ error: "خطأ في الخادم الداخلي" });
    }
};

// ✅ جلب جميع المستخدمين (مع إخفاء كلمة المرور)
const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password"); // إخفاء كلمة المرور
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "خطأ في الخادم الداخلي" });
    }
};

// ✅ جلب مستخدم عبر الـ ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ error: "المستخدم غير موجود" });

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "خطأ في الخادم الداخلي" });
    }
};

// ✅ تحديث بيانات المستخدم
const updateUser = async (req, res) => {
    try {
        const { firstName, familyName, email, phoneNumber, town, region, password, pfp, isAdmin } = req.body;
        let updateData = { firstName, familyName, email, phoneNumber, town, region, pfp, isAdmin };

        // ✅ في حالة تحديث كلمة المرور، نقوم بتشفيرها
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).select("-password");

        if (!updatedUser) return res.status(404).json({ error: "المستخدم غير موجود" });

        res.status(200).json({ message: "تم التحديث بنجاح", user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: "خطأ في الخادم الداخلي" });
    }
};

// ✅ حذف المستخدم
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ error: "المستخدم غير موجود" });

        res.status(200).json({ message: "تم الحذف بنجاح" });
    } catch (error) {
        res.status(500).json({ error: "خطأ في الخادم الداخلي" });
    }
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
};
