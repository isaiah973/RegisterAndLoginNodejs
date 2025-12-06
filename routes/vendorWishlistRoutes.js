// routes/vendorWishlistRoutes.js
const express = require("express");
const Vendor = require("../models/vendorModel");

const router = express.Router();

// Add product to wishlist
router.post("/add", async (req, res) => {
  try {
    const { vendorId, productId } = req.body;

    const vendor = await Vendor.findById(vendorId);
    if (!vendor)
      return res
        .status(404)
        .json({ success: false, message: "Vendor not found" });

    if (vendor.wishlist.includes(productId))
      return res.json({ success: true, message: "Already in wishlist" });

    vendor.wishlist.push(productId);
    await vendor.save();

    res.json({ success: true, message: "Added to wishlist" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get vendor wishlist
router.get("/:vendorId", async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.vendorId).populate(
      "wishlist"
    );
    if (!vendor)
      return res
        .status(404)
        .json({ success: false, message: "Vendor not found" });

    res.json({ success: true, wishlist: vendor.wishlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Remove product from wishlist
router.post("/remove", async (req, res) => {
  try {
    const { vendorId, productId } = req.body;

    const vendor = await Vendor.findById(vendorId);
    if (!vendor)
      return res
        .status(404)
        .json({ success: false, message: "Vendor not found" });

    vendor.wishlist = vendor.wishlist.filter(
      (id) => id.toString() !== productId
    );
    await vendor.save();

    res.json({ success: true, message: "Removed from wishlist" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
