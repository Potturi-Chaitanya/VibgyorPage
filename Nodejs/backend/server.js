const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 Connect MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// 🔥 Schema
const leadSchema = new mongoose.Schema({
  mobile: String,
  email: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Lead = mongoose.model("Lead", leadSchema);

// 🔥 Save Lead
app.post("/saveLead", async (req, res) => {
  const { mobile, email } = req.body;

  try {
    const newLead = new Lead({ mobile, email });
    await newLead.save();

    res.json({ message: "Saved to MongoDB" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error" });
  }
});

// 🔥 Get Leads
app.get("/leads", async (req, res) => {
  const leads = await Lead.find();
  res.json(leads);
});

// 🔥 PORT FIX
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
