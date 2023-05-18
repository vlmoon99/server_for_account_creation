const express = require("express");
const cors = require("cors");
const { createAccount } = require("./controllers/accounts");

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

app.post("/create-account", async (req, res) => {
  try {
    const { accountId } = req.body;
    const response = await createAccount(accountId);
    res.json(response);
  } catch (err) {
    res.status(400).json({ message: "Error: " + err.message });
  }
});

app.use((req, res) => {
  res.status(404).send("Not Found");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
