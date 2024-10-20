const express = require("express");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 5000;

// Enable CORS for all origins
app.use(cors());

app.get("/", (req, res) => {
  res.send("MERNSTACK Server for Carshop is Started");
});

// Handle undefined routes (404 Not Found)
app.use((req, res) => {
  res.status(404).send({ error: "Endpoint Not Found" });
});

app.listen(port, (req, res) => {
  console.log(`MERNSTACK Server for Carshop is Running on port ${port}`);
});

module.exports = app;
