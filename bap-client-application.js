const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());

// Enable CORS for all routes
app.use(cors());

app.post("/on_subscribe", (req, res) => {
  console.log("Received a subscription request:", req.body);
  
  res.status(200).send({ message: "Subscription successful" });
});

app.post("/client_callback", (req, res) => {
  console.log(
    "Received a response for client_callback:",
    JSON.stringify(req.body, null, 2)
  );
  res.status(200).send({ message: "successful" });
});

let globalTrialValue = {};

app.post("/trial", (req, res) => {
  console.log("Received a response for trial:", JSON.stringify(req.body, null, 2));
  globalTrialValue = JSON.stringify(req.body, null, 2)
  res.status(200).send({ message: "successful" });
});

app.get("/select", async(req, res) => {
  res.status(200).send(globalTrialValue);
});

app.post("/search", async (req, res) => {
  try {
    const requestData = {
      context: req.body.context,
      message: req.body.message,
    };
    console.log("Request Data:", JSON.stringify(requestData, null, 2));
    const response = await axios.post(
      "http://localhost:5000/search",
      requestData
    );
    axios.post
    console.log("Response Data:", JSON.stringify(response.data, null, 2));
    res.json(response.data);
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).send({ error: "Failed to search" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
