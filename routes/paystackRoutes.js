const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/paystack/verify", async (req, res) => {
  const { reference } = req.body;

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: "Verification failed", error });
  }
});
module.exports = router;
