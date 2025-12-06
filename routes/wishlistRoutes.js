// routes/wishlist.js
const express = require("express");
const {
  getWishlist,
  toggleWishlist,
} = require("../controller/wishlistController");
const authMiddleware = require("../Middleware/auth");
const router = express.Router();

// Get wishlist
router.get("/", authMiddleware, getWishlist);

// Toggle product in wishlist
router.post("/toggle/:productId", authMiddleware, toggleWishlist);

export default router;
