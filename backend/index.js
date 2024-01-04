const express = require("express");
const routes = require("./route");

const app = express();
const cors = require("cors");

require("dotenv").config();
require("./db/config");

app.use(express.json());
app.use(cors());
app.use("/", routes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
