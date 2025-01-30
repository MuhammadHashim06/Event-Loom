import express from "express";
import Ticket from "../models/Ticket.js";

const router = express.Router();

// Book a Ticket
router.post("/", async (req, res) => {
  try {
    const { eventId, userId } = req.body;
    const ticket = new Ticket({ eventId, userId });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Tickets for a User
router.get("/:userId", async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.params.userId }).populate("eventId");
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
