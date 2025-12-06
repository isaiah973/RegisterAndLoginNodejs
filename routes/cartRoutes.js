// routes/cartRoutes.js
const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");

// Token-based (frontend sends ownerToken)
router.post("/save", cartController.save);
router.get("/get/:token", cartController.getByToken);

// Session-based (use cookies)
router.get("/session", cartController.getBySession);
router.post("/save-session", cartController.saveBySession);

module.exports = router;
