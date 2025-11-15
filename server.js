const expressApp = require("express");
require("dotenv").config();
require("./db");
require("./models/userModel");
const User = require("./models/userModel");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = expressApp();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(expressApp.json());
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
