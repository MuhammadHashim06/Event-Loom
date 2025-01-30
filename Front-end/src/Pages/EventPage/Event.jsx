// import { useState } from "react";
// import axios from "axios"; // Import axios for making API requests
// import "./Event.css";

// export default function Event() {
//   const [events, setEvents] = useState([
//     { id: 1, title: "Tech Conference 2025", date: "2025-03-15", location: "New York" },
//     { id: 2, title: "React Meetup", date: "2025-04-10", location: "San Francisco" },
//     { id: 3, title: "Startup Pitch Night", date: "2025-05-05", location: "Los Angeles" }
//   ]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showForm, setShowForm] = useState(false); // To toggle the event form
//   const [newEvent, setNewEvent] = useState({
//     title: "",
//     description: "",
//     date: "",
//     location: "",
//     price: "",
//   });

//   const filteredEvents = events.filter(event =>
//     event.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewEvent((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   // Handle form submission (add new event)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/api/events", newEvent); // Adjust URL if needed
//       setEvents((prevEvents) => [...prevEvents, response.data]); // Add the new event to the list
//       setShowForm(false); // Close the form after submission
//       setNewEvent({
//         title: "",
//         description: "",
//         date: "",
//         location: "",
//         price: "",
//       }); // Reset form
//     } catch (error) {
//       console.error("There was an error creating the event!", error);
//     }
//   };

//   return (
//     <div className="event-page">
//       <div className="event-container">
//         <div className="event-header">
//           <h2>Upcoming Events</h2>
//           <button className="add-event-btn" onClick={() => setShowForm(true)}>
//             Add New Event
//           </button>
//         </div>

//         {showForm && (
//           <form className="add-event-form" onSubmit={handleSubmit}>
//             <input
//               type="text"
//               name="title"
//               placeholder="Event Title"
//               value={newEvent.title}
//               onChange={handleChange}
//               required
//             />
//             <textarea
//               name="description"
//               placeholder="Event Description"
//               value={newEvent.description}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="date"
//               name="date"
//               value={newEvent.date}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="text"
//               name="location"
//               placeholder="Event Location"
//               value={newEvent.location}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="number"
//               name="price"
//               placeholder="Event Price"
//               value={newEvent.price}
//               onChange={handleChange}
//               required
//             />
//             <button type="submit">Create Event</button>
//             <button type="button" onClick={() => setShowForm(false)}>
//               Cancel
//             </button>
//           </form>
//         )}

//         <input
//           type="text"
//           placeholder="Search Events..."
//           className="search-bar"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <ul className="event-list">
//           {filteredEvents.map((event) => (
//             <li key={event.id} className="event-item">
//               <h3>{event.title}</h3>
//               <p>Date: {event.date}</p>
//               <p>Location: {event.location}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import axios from "axios";
import "./Event.css";

export default function Event() {
  const [events, setEvents] = useState([
    { id: 1, title: "Tech Conference 2025", date: "2025-03-15", location: "New York" },
    { id: 2, title: "React Meetup", date: "2025-04-10", location: "San Francisco" },
    { id: 3, title: "Startup Pitch Night", date: "2025-05-05", location: "Los Angeles" }
  ]);
  const userData = JSON.parse(sessionStorage.getItem('userData'))
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false); 
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    price: "",
    createdBy:userData.userId
  });

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      const response = await axios.post("http://localhost:5000/api/events", newEvent); // Adjust URL if needed
      setEvents((prevEvents) => [...prevEvents, response.data]); // Add the new event to the list
      setShowForm(false); // Close the form after submission
      setNewEvent({
        title: "",
        description: "",
        date: "",
        location: "",
        price: "",
      }); // Reset form
    } catch (error) {
      console.error("There was an error creating the event!", error);
    }
  };

  // Close the modal if clicked outside
  const handleModalClose = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setShowForm(false);
    }
  };

  return (
    <div className="event-page">
      <div className="event-container">
        <div className="event-header">
          <h2>Upcoming Events</h2>
          <button className="add-event-btn" onClick={() => setShowForm(true)}>
            Add New Event
          </button>
        </div>

        {showForm && (
          <div className="modal-overlay" onClick={handleModalClose}>
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
                  <button type="button" onClick={() => setShowForm(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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
              <h3>{event.title}</h3>
              <p>Date: {event.date}</p>
              <p>Location: {event.location}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
