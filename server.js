const expressApp = require("express");
require("dotenv").config();
require("./db");
require("./models/userModel");
const paystackRoutes = require("./routes/paystackRoutes");
const User = require("./models/userModel");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const productRoutes = require("./routes/productRoutes");
const app = expressApp();
const cookieParser = require("cookie-parser");
const Vendor = require("./models/vendorModel");
const path = require("path");
const vendorWishlistRoutes = require("./routes/vendorWishlistRoutes");
const cartRoutes = require("./routes/cartRoutes");
// const wishlistRoutes = require("./routes/wishlistRoutes");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5175"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(expressApp.json());
app.use("/api/users", userRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/products", productRoutes);
// app.use("/uploads", expressApp.static("uploads"));
app.use("/uploads", expressApp.static(path.join(process.cwd(), "uploads")));
app.use("/api/vendor-wishlist", vendorWishlistRoutes);
app.use("/api/paystack", paystackRoutes);
app.use("/api/cart", cartRoutes);
// app.use("/api/wishlist", wishlistRoutes);

app.get("/api/me", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ loggedIn: false });

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ loggedIn: true, user });
  } catch (err) {
    return res.json({ loggedIn: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
