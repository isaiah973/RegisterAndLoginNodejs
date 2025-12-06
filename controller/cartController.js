const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Vendor = require("../models/vendorModel");

// Helper: extract ownerId from JWT token
function getOwnerIdFromToken(token) {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id || decoded._id || null;
  } catch (err) {
    console.error("JWT verify error:", err.message);
    return null;
  }
}

// Helper: find user/vendor by ID
async function findOwnerById(ownerId) {
  if (!ownerId) return null;
  let owner = await User.findById(ownerId).populate("cart.product");
  if (owner) return { owner, type: "user" };
  owner = await Vendor.findById(ownerId).populate("cart.product");
  if (owner) return { owner, type: "vendor" };
  return null;
}

// ------------------ SAVE CART ------------------
exports.save = async (req, res) => {
  try {
    const { ownerType, ownerToken, cart } = req.body;

    if (!ownerToken)
      return res
        .status(400)
        .json({ success: false, message: "Token required" });

    const ownerId = getOwnerIdFromToken(ownerToken);
    if (!ownerId)
      return res.status(400).json({ success: false, message: "Invalid token" });

    const owner =
      ownerType === "vendor"
        ? await Vendor.findById(ownerId)
        : await User.findById(ownerId);

    if (!owner)
      return res
        .status(404)
        .json({ success: false, message: "Owner not found" });

    // Map cart items
    owner.cart = (cart || []).map((item) => ({
      product: item._id,
      quantity: item.quantity || 1,
    }));

    await owner.save();

    return res.json({ success: true, cart: owner.cart });
  } catch (err) {
    console.error("cart.save error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

// ------------------ GET CART BY TOKEN ------------------
exports.getByToken = async (req, res) => {
  try {
    const token = req.params.token;
    if (!token) return res.json({ success: false, message: "Token required" });

    const ownerId = getOwnerIdFromToken(token);
    if (!ownerId) return res.json({ success: false, message: "Invalid token" });

    const found = await findOwnerById(ownerId);
    if (!found) return res.json({ success: false, message: "Owner not found" });

    return res.json({
      success: true,
      type: found.type,
      cart: found.owner.cart,
    });
  } catch (err) {
    console.error("cart.getByToken error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

// ------------------ SESSION-BASED CART (cookie JWT) ------------------
exports.getBySession = async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token)
      return res.json({ success: false, message: "No session token" });

    const ownerId = getOwnerIdFromToken(token);
    if (!ownerId)
      return res.json({ success: false, message: "Invalid session token" });

    const found = await findOwnerById(ownerId);
    if (!found) return res.json({ success: false, message: "Owner not found" });

    return res.json({
      success: true,
      type: found.type,
      cart: found.owner.cart,
    });
  } catch (err) {
    console.error("cart.getBySession error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.saveBySession = async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token)
      return res
        .status(400)
        .json({ success: false, message: "No session token" });

    const ownerId = getOwnerIdFromToken(token);
    if (!ownerId)
      return res
        .status(400)
        .json({ success: false, message: "Invalid session token" });

    const found = await findOwnerById(ownerId);
    if (!found)
      return res
        .status(404)
        .json({ success: false, message: "Owner not found" });

    const cart = req.body.cart || [];
    found.owner.cart = cart.map((item) => ({
      product: item._id,
      quantity: item.quantity || 1,
    }));

    await found.owner.save();

    return res.json({ success: true, cart: found.owner.cart });
  } catch (err) {
    console.error("cart.saveBySession error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
};
