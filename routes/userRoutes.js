const expressApp = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  verifyUser,
  logoutUser,
} = require("../controller/userController");

const router = expressApp.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/verify-email", verifyUser);

router.post("/logout", logoutUser);

// router.post("/logout", logoutUser);

router.get("/", getAllUsers);

module.exports = router;
