import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

// Create Event
router.post("/", async (req, res) => {
  try {
    const { title, description, date, location, price, createdBy } = req.body;
    const event = new Event({ title, description, date, location, price, createdBy });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "name email");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Events by User ID (Events created by a specific user)
router.get("/user/:userId", async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.params.userId }).populate("createdBy", "name email");
    if (events.length === 0) return res.status(404).json({ message: "No events found for this user" });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit Event
router.put("/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEvent) return res.status(404).json({ message: "Event not found" });
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Event
router.delete("/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
