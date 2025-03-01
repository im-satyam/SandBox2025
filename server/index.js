const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectDB = require("./db");
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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
