const express = require("express");
const routes = require("./route");

const app = express();
const cors = require("cors");
const path = require('path');

require("dotenv").config();
require("./db/config");

app.use(express.json());
app.use(cors());
app.use("/", routes);

//deploy
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "../frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
