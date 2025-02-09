// AddEvent.jsx
import { useState } from "react";
import axios from "axios";

export default function AddEvent({ token, onEventAdded }) {
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    price: "",
    createdBy: JSON.parse(sessionStorage.getItem('userData')).userId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/events", newEvent, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onEventAdded(response.data); // Notify parent that an event was added
      setNewEvent({
        title: "",
        description: "",
        date: "",
        location: "",
        price: "",
      });
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Create New Event</h3>
        <form className="add-event-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Event Description"
            value={newEvent.description}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            value={newEvent.date}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Event Location"
            value={newEvent.location}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Event Price"
            value={newEvent.price}
            onChange={handleChange}
            required
          />
          <div className="modal-buttons">
            <button type="submit">Create Event</button>
            <button type="button" onClick={() => onEventAdded(null)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
