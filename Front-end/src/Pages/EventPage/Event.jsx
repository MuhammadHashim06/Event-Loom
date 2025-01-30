// import { useState, useEffect } from "react";
// import axios from "axios";
// import "./Event.css";

// export default function Event() {
//   const [events, setEvents] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const [newEvent, setNewEvent] = useState({
//     title: "",
//     description: "",
//     date: "",
//     location: "",
//     price: "",
//     createdBy: JSON.parse(sessionStorage.getItem('userData')).userId, // Get userId from session storage
//   });

//   // Fetch events from the backend
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/events");
//         setEvents(response.data); // Set the events state with the fetched events
//       } catch (error) {
//         console.error("There was an error fetching events!", error);
//       }
//     };
//     fetchEvents();
//   }, []);

//   const filteredEvents = events.filter(event =>
//     event.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewEvent((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

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

//   // Close the modal if clicked outside
//   const handleModalClose = (e) => {
//     if (e.target.classList.contains("modal-overlay")) {
//       setShowForm(false);
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
//           <div className="modal-overlay" onClick={handleModalClose}>
//             <div className="modal-content">
//               <h3>Create New Event</h3>
//               <form className="add-event-form" onSubmit={handleSubmit}>
//                 <input
//                   type="text"
//                   name="title"
//                   placeholder="Event Title"
//                   value={newEvent.title}
//                   onChange={handleChange}
//                   required
//                 />
//                 <textarea
//                   name="description"
//                   placeholder="Event Description"
//                   value={newEvent.description}
//                   onChange={handleChange}
//                   required
//                 />
//                 <input
//                   type="date"
//                   name="date"
//                   value={newEvent.date}
//                   onChange={handleChange}
//                   required
//                 />
//                 <input
//                   type="text"
//                   name="location"
//                   placeholder="Event Location"
//                   value={newEvent.location}
//                   onChange={handleChange}
//                   required
//                 />
//                 <input
//                   type="number"
//                   name="price"
//                   placeholder="Event Price"
//                   value={newEvent.price}
//                   onChange={handleChange}
//                   required
//                 />
//                 <div className="modal-buttons">
//                   <button type="submit">Create Event</button>
//                   <button type="button" onClick={() => setShowForm(false)}>
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
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



import { useState, useEffect } from "react";
import axios from "axios";
import "./Event.css";

export default function Event() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    price: "",
    createdBy: JSON.parse(sessionStorage.getItem('userData')).userId, // Get userId from session storage
  });

  const [selectedEvent, setSelectedEvent] = useState(null); // Track selected event for modal

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events");
        setEvents(response.data); // Set the events state with the fetched events
      } catch (error) {
        console.error("There was an error fetching events!", error);
      }
    };
    fetchEvents();
  }, []);

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

  // Open event details modal
  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  // Close the modal if clicked outside
  const handleModalClose = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setSelectedEvent(null); // Close the modal by resetting the selectedEvent state
    }
  };

  // Handle ticket booking
  const handleBookTicket = async () => {
    try {
      
      // Send the POST request to book the ticket
      const response = await axios.post("http://localhost:5000/api/tickets", {
        eventId: selectedEvent._id,
        userId: JSON.parse(sessionStorage.getItem('userData')).userId, // Get userId from session storage
      });
  
      // Display success message
      alert(`Ticket booked for ${selectedEvent.title}!`);
      setSelectedEvent(null); // Close the modal after booking the ticket
  
      // You can optionally fetch updated tickets for the user if needed
    } catch (error) {
      console.error("There was an error booking the ticket!", error);
      alert("Failed to book the ticket. Please try again.");
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

        {/* Search Events */}
        <input
          type="text"
          placeholder="Search Events..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Event List */}
        <ul className="event-list">
          {filteredEvents.map((event) => (
            <li key={event.id} className="event-item" onClick={() => handleEventClick(event)}>
              <h3>{event.title}</h3>
              <p>Date: {event.date}</p>
              <p>Location: {event.location}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-content">
            <h3>{selectedEvent.title}</h3>
            <p>{selectedEvent.description}</p>
            <p>Date: {selectedEvent.date}</p>
            <p>Location: {selectedEvent.location}</p>
            <p>Price: ${selectedEvent.price}</p>
            <div className="modal-buttons">
              <button onClick={handleBookTicket}>Book Ticket</button>
              <button onClick={handleModalClose}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
