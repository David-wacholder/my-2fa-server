const express = require("express");
const bodyParser = require("body-parser");
const speakeasy = require("speakeasy");

const app = express();
const PORT = 3000; // Port for local use only

// Use body-parser to handle JSON requests
app.use(bodyParser.json());

// Generate 2FA code
app.post("/api/2fa", (req, res) => {
  const { secret, apiKey } = req.body;

  try {
    // Generate 2FA code using speakeasy
    const token = speakeasy.totp({
      secret: secret,
      encoding: "base32",
      time: Math.floor(Date.now() / 1000 / 30) // Ensures it uses UTC time in 30-second intervals
    });

    // Send a customized response
    res.status(200).send(`id_list_message=t-The code is!.d-${token}`);
  } catch (error) {
    res.status(500).json({ error: "Error generating 2FA code" });
  }
});

// Run the server locally
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
