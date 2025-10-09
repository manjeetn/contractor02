import express from "express";
import Contact from "../models/Contact.js";
import Quote from "../models/Quote.js";

const router = express.Router();

/* router.post("/contact", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: "Contact form submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving contact", error });
  }
}); */

router.post("/contact", async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    // --- Validation ---
    if (!name || !phone || !email || !message) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    if (!/^\d+$/.test(phone)) {
      return res.status(400).json({ message: "Phone number must contain only digits." });
    }

    if (phone.length !== 10) {
      return res.status(400).json({ message: "Phone number must be exactly 10 digits long." });
    }

    const contact = new Contact({ name, phone, email, message });
    await contact.save();

    res.status(201).json({ message: "Contact form submitted successfully" });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ message: "Error saving contact", error: error.message });
  }
});


/* router.post("/quote", async (req, res) => {
  try {
    const quote = new Quote(req.body);
    await quote.save();
    res.status(201).json({ message: "Quote form submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving quote", error });
  }
});
 */
router.post("/quote", async (req, res) => {
  try {
    const { fullName, service, email, phone, message } = req.body;

    // --- Validation ---
    if (!fullName || !service || !email || !phone) {
      return res.status(400).json({ message: "All fields required." });
    }

    // Check if phone contains only numbers
    if (!/^\d+$/.test(phone)) {
      return res.status(400).json({ message: "Phone number must contain only digits." });
    }

    // Check phone length (10 digits)
    if (phone.length !== 10) {
      return res.status(400).json({ message: "Phone number must be exactly 10 digits long." });
    }

    // Everything valid -> save to DB
    const quote = new Quote({ fullName, service, email, phone, message });
    await quote.save();

    res.status(201).json({ message: "Quote form submitted successfully" });
  } catch (error) {
    console.error("Error saving quote:", error);
    res.status(500).json({ message: "Error saving quote", error: error.message });
  }
});


router.get ("/contact", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching contacts" });
  }
});


router.get ("/quote", async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching quotes" });
  }
});


export default router;
