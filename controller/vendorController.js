const Vendor = require("../models/vendorModel");
const bcrypt = require("bcryptjs");
const generateTokenAndSetCookie = require("../utils/generateTokenAndSetCookie");

// ===============================
//  REGISTER VENDOR
// ===============================
const registerVendor = async (req, res) => {
  try {
    const { name, email, password, storeName, phone, address } = req.body;

    if (!name || !email || !password || !storeName) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const vendor = await Vendor.create({
      name,
      email,
      password: hashedPassword,
      storeName,
      phone,
      address,
    });

    generateTokenAndSetCookie(res, vendor._id);

    return res.status(201).json({
      success: true,
      message: "Vendor registered successfully",
      vendor: {
        ...vendor._doc,
        password: undefined,
      },
    });
    console.log("Registered Vendor:", vendor);
  } catch (error) {
    console.log("Register Vendor Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const vendorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, vendor.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    // generate token
    const token = generateTokenAndSetCookie(res, vendor._id);

    return res.status(200).json({
      success: true,
      token, // <-- send JWT to frontend
      message: "Vendor logged in successfully",
      vendor: {
        ...vendor._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Vendor Login Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  registerVendor,
  vendorLogin,
};
