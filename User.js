const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    familyName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    town: { type: String, required: true },
    region: { type: String, required: true },
    password: { type: String, required: true }, // Should be hashed
    pfp: { type: String, default: "" }, // Profile picture URL
    isAdmin: { type: Boolean, default: false }
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

module.exports = User;
