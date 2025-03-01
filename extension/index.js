const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 8081;
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/v1", require("./emailRouter"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
