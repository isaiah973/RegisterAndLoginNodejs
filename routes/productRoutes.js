const upload = require("../Middleware/upload");
const {
  createProduct,
  getAllProducts,
  getProductById,
} = require("../controller/productController");
const express = require("express");
const router = express.Router();

// Route to create a new product
router.post("/create-product", upload.single("image"), createProduct);
router.get("/get-products", getAllProducts);
router.get("/product/:id", getProductById);

module.exports = router;
