/*const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config(); // تحميل المتغيرات البيئية

const userRoutes = require("./routes/userRoutes"); 

const app = express();
app.use(express.json()); 
app.use(cors()); // تفعيل CORS لدعم الطلبات من متصفحات مختلفة

// الاتصال بقاعدة البيانات
mongoose.connect("mongodb://127.0.0.1:27017/project", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ DB Connection Error:", err));

// اختبار نقطة وصول
app.get("/hello", (req, res) => {
    res.send("Hello Zahra!");
});

// تعريف المسارات
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
*/


const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config(); // تحميل المتغيرات البيئية

const userRoutes = require("./routes/userRoutes");
const { verifyToken, isAdmin } = require("./middlewares/authMiddleware");

const app = express();
app.use(express.json());
app.use(cors()); 

// connecting to database
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/project", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("DB Connection Error:", error));

// testing
app.get("/hello", (req, res) => {
    res.send("Hello Zahra!");
});

app.use("/api/users", userRoutes);

const adminRouter = express.Router();
const userController = require("./controllers/userController");

adminRouter.use(verifyToken, isAdmin); 

adminRouter.get("/", userController.getUsers);        //get all users
adminRouter.get("/:id", userController.getUserById);  // get one user id
adminRouter.put("/:id", userController.updateUser);   // modify information
adminRouter.delete("/:id", userController.deleteUser);// delete user

app.use("/api/admin/users", adminRouter); 

const commentRoutes = require("./routes/commentRoutes"); 
app.use("/api/comments", commentRoutes);


// employment the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));