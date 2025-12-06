const expressApp = require("express");

const {
  registerVendor,
  vendorLogin,
} = require("../controller/vendorController");

const router = expressApp.Router();

router.post("/register", registerVendor);
router.post("/login", vendorLogin);

module.exports = router;
