const { MailtrapClient } = require("mailtrap");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

console.log("Loaded TOKEN:", process.env.MAILTRAP_TOKEN);

const mailtrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
});

const sender = {
  email: process.env.SENDER_EMAIL,
  name: "Adeola Isaiah",
};
module.exports = { mailtrapClient, sender };
