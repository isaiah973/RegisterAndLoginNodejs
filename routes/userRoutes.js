const expressApp = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  verifyUser,
  logoutUser,
  forgotPassword,
} = require("../controller/userController");

const router = expressApp.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/verify-email", verifyUser);

router.post("/logout", logoutUser);

router.post("/forgot-password", forgotPassword);

// router.post("/logout", logoutUser);

router.get("/", getAllUsers);

module.exports = router;
