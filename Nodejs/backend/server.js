const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// TEMP STORAGE (later DB)
let leads = [];

// API to save lead
app.post("/saveLead", (req, res) => {
  const { mobile, email } = req.body;

  if (!mobile || !email) {
    return res.status(400).send("Missing data");
  }

  const newLead = {
    mobile,
    email,
    time: new Date(),
  };

  leads.push(newLead);

  console.log("New Lead:", newLead);

  res.send({ message: "Lead saved successfully" });
});

// API to view leads (for testing)
app.get("/leads", (req, res) => {
  res.json(leads);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
