const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Schema
const leadSchema = new mongoose.Schema({
  mobile: String,
  email: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Lead = mongoose.model("Lead", leadSchema);

// Save Lead API
app.post("/saveLead", async (req, res) => {
  const { mobile, email } = req.body;

  if (!mobile || !email) {
    return res.status(400).json({ message: "Missing data" });
  }

  try {
    const newLead = new Lead({ mobile, email });
    await newLead.save();

    res.json({ message: "Lead saved successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error saving lead" });
  }
});

// Get Leads API
app.get("/leads", async (req, res) => {
  const leads = await Lead.find();
  res.json(leads);
});

// Port fix (IMPORTANT)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
