// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Replace with your actual JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Attach user info to request
    req.user = { id: user._id, email: user.email };
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
