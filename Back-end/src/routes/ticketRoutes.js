import express from "express";
import Ticket from "../models/Ticket.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

// Book a Ticket (Protected)
router.post("/", protect, async (req, res) => {
  try {
    const { eventId } = req.body;
    const ticket = new Ticket({ eventId, userId: req.user._id });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get Tickets for a Specific User (Protected)
router.get("/:userId", protect, async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.params.userId }).populate("eventId");
    if (tickets.length === 0) return res.status(404).json({ message: "No tickets found for this user" });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



export default router;
