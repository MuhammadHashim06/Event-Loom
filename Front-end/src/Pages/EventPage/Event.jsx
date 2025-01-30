import { useState } from "react";
import "./Event.css";

export default function Event() {
  const [events, setEvents] = useState([
    { id: 1, name: "Tech Conference 2025", date: "2025-03-15", location: "New York" },
    { id: 2, name: "React Meetup", date: "2025-04-10", location: "San Francisco" },
    { id: 3, name: "Startup Pitch Night", date: "2025-05-05", location: "Los Angeles" }
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="event-page">
      <div className="event-header">
          <h2>Upcoming Events</h2>
          <button className="add-event-btn">Add New Event</button>
        </div>
      <div className="event-container">
        
        <input
          type="text"
          placeholder="Search Events..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul className="event-list">
          {filteredEvents.map((event) => (
            <li key={event.id} className="event-item">
              <h3>{event.name}</h3>
              <p>Date: {event.date}</p>
              <p>Location: {event.location}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
