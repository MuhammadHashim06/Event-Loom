import express from "express";
import Event from "../models/Event.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create Event (Protected)
router.post("/", protect, async (req, res) => {
  try {
    const { title, description, date, location, price } = req.body;
    const event = new Event({
      title,
      description,
      date,
      location,
      price,
      createdBy: req.user._id, // Get user from middleware
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Events (Public)
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().populate("createdBy", "name email");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Events by User ID (Protected)
router.get("/user/:userId", protect, async (req, res) => {
  try {
    // Check if the user is authorized to view their own events
    if (!req.user._id.equals(req.params.userId)) {
      return res.status(403).json({ message: "Not authorized to view these events" });
    }

    const events = await Event.find({ createdBy: req.params.userId }).populate("createdBy", "name email");

    if (events.length === 0) {
      return res.status(404).json({ message: "No events found for this user" });
    }

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Edit Event (Protected)
router.put("/:id", protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: "Event not found" });

    // Ensure only the event creator can edit
    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Event (Protected)
router.delete("/:id", protect, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Event.deleteOne({ _id: req.params.id }); // ✅ Correct way
    // OR
    // await Event.findByIdAndDelete(req.params.id); // ✅ Another correct way

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default router;
