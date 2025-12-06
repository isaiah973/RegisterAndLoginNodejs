const Product = require("../models/productModel");

// Controller to create a new product
const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, stock, sku, tags, image } =
      req.body;

    if (!title || !description || !price || !category || !stock) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }
    const imagePath = `/uploads/${req.file.filename}`;
    const newProduct = new Product({
      title,
      description,
      price,
      category,
      stock,
      sku,
      tags,
      image: imagePath,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      savedProduct: { ...savedProduct._doc },
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

// Additional controller to get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      message: "Fetched all products",
      allProducts: products,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching products", error });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      message: "Fetched product by ID",
      product,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching product", error });
  }
};

module.exports = { createProduct, getAllProducts, getProductById };
