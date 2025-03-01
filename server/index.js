const express = require("express");
const cron = require("node-cron");

const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectDB = require("./db");
const emailAlert = require("./controllers/alertController");
const app = express();
const port = process.env.PORT;
connectDB();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/v1", require("./router/authRouter"));
app.use("/v1", require("./router/emailRouter"));
app.use("/v1", require("./router/passwordRouter"));
app.use("/v1", require("./router/urlRouter"));
app.use("/v1", require("./router/mailRouter"));
app.use("/v1", require("./router/chatBotRouter"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});
cron.schedule("*/1 * * * *", async () => {
  console.log("Running breach monitoring...");
  await emailAlert();
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
