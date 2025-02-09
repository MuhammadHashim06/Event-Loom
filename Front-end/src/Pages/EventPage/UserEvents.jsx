// import { useState, useEffect } from "react";
// import axios from "axios";
// import "./UserEvents.css";

// export default function UserEvents() {
//   const userData = JSON.parse(sessionStorage.getItem("userData"));
//   const userId = userData?._id;
//   // const token = sessionStorage.getItem("token"); // Assuming token is stored in sessionStorage
// const token = userData.token
//   const [userEvents, setUserEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [updatedEvent, setUpdatedEvent] = useState({
//     title: "",
//     description: "",
//     date: "",
//     location: "",
//     price: "",
//   });

//   // Fetch user's events
//   useEffect(() => {
//     console.log('i am called')
//     const fetchUserEvents = async () => {
//       if (!userId || !token) return;
//       try {
//         const response = await axios.get(`http://localhost:5000/api/events/user/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUserEvents(response.data);
//       } catch (error) {
//         console.error("Error fetching user events:", error.response?.data?.message || error.message);
//       }
//     };

//     fetchUserEvents();
//   }, [userId, token]);

//   // Open event details modal
//   const handleEventClick = (event) => {
//     setSelectedEvent(event);
//     setUpdatedEvent(event);
//     setIsEditing(false);
//   };

//   // Close modal
//   const handleModalClose = (e) => {
//     if (e.target.classList.contains("modal-overlay")) {
//       setSelectedEvent(null);
//     }
//   };

//   // Handle event update
//   const handleUpdate = async () => {
//     if (!token) return alert("Unauthorized");

//     try {
//       const response = await axios.put(
//         `http://localhost:5000/api/events/${selectedEvent._id}`,
//         updatedEvent,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setUserEvents((prevEvents) =>
//         prevEvents.map((event) => (event._id === selectedEvent._id ? response.data : event))
//       );
//       setSelectedEvent(response.data);
//       setIsEditing(false);
//       alert("Event updated successfully!");
//     } catch (error) {
//       console.error("Error updating event:", error.response?.data?.message || error.message);
//     }
//   };

//   // Handle event deletion
//   const handleDelete = async () => {
//     if (!token) return alert("Unauthorized");

//     if (!window.confirm("Are you sure you want to delete this event?")) return;

//     try {
//       await axios.delete(`http://localhost:5000/api/events/${selectedEvent._id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setUserEvents((prevEvents) => prevEvents.filter((event) => event._id !== selectedEvent._id));
//       setSelectedEvent(null);
//       alert("Event deleted successfully!");
//     } catch (error) {
//       console.error("Error deleting event:", error.response?.data?.message || error.message);
//     }
//   };

//   // Handle input changes for update form
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedEvent((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="user-events-page">
//       <h2>My Events</h2>
//       {userEvents.length === 0 ? (
//         <p>No events found.</p>
//       ) : (
//         <ul className="user-event-list">
//           {userEvents.map((event) => (
//             <li key={event._id} className="user-event-item" onClick={() => handleEventClick(event)}>
//               <h3>{event.title}</h3>
//               <p>Date: {event.date}</p>
//               <p>Location: {event.location}</p>
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* Event Detail Modal */}
//       {selectedEvent && (
//         <div className="modal-overlay" onClick={handleModalClose}>
//           <div className="modal-content">
//             <h3>{isEditing ? "Edit Event" : selectedEvent.title}</h3>

//             {isEditing ? (
//               <>
//                 <input type="text" name="title" value={updatedEvent.title} onChange={handleChange} required />
//                 <textarea name="description" value={updatedEvent.description} onChange={handleChange} required />
//                 <input type="date" name="date" value={updatedEvent.date} onChange={handleChange} required />
//                 <input type="text" name="location" value={updatedEvent.location} onChange={handleChange} required />
//                 <input type="number" name="price" value={updatedEvent.price} onChange={handleChange} required />
//               </>
//             ) : (
//               <>
//                 <p>{selectedEvent.description}</p>
//                 <p>Date: {selectedEvent.date}</p>
//                 <p>Location: {selectedEvent.location}</p>
//                 <p>Price: ${selectedEvent.price}</p>
//               </>
//             )}

//             <div className="modal-buttons">
//               {isEditing ? (
//                 <>
//                   <button onClick={handleUpdate}>Save Changes</button>
//                   <button onClick={() => setIsEditing(false)}>Cancel</button>
//                 </>
//               ) : (
//                 <>
//                   <button onClick={() => setIsEditing(true)}>Update</button>
//                   <button onClick={handleDelete}>Delete</button>
//                   <button onClick={() => setSelectedEvent(null)}>Close</button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// UserEvents.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import AddEvent from "./AddEvent"; // Import AddEvent component
import "./UserEvents.css";

export default function UserEvents() {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const userId = userData?._id;
  const token = userData.token;

  const [userEvents, setUserEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddEventForm, setShowAddEventForm] = useState(false); // Track whether to show add event form
  const [isEditing, setIsEditing] = useState(false); // Track whether the user is editing the event
  const [updatedEvent, setUpdatedEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    price: "",
  });

  useEffect(() => {
    const fetchUserEvents = async () => {
      if (!userId || !token) return;
      try {
        const response = await axios.get(`http://localhost:5000/api/events/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserEvents(response.data);
      } catch (error) {
        console.error("Error fetching user events:", error.response?.data?.message || error.message);
      }
    };

    fetchUserEvents();
  }, [userId, token]);

  // Handle event details click
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setUpdatedEvent(event); // Set initial values for the update form
    setIsEditing(false); // Ensure it's in view mode
  };

  // Handle modal close (for both add event and view/edit event)
  const handleModalClose = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setSelectedEvent(null);
      setIsEditing(false);
    }
  };

  // Handle event update
  const handleUpdate = async () => {
    if (!token) return alert("Unauthorized");

    try {
      const response = await axios.put(
        `http://localhost:5000/api/events/${selectedEvent._id}`,
        updatedEvent,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUserEvents((prevEvents) =>
        prevEvents.map((event) => (event._id === selectedEvent._id ? response.data : event))
      );
      setSelectedEvent(response.data);
      setIsEditing(false); // Switch to view mode after update
      alert("Event updated successfully!");
    } catch (error) {
      console.error("Error updating event:", error.response?.data?.message || error.message);
    }
  };

  // Handle event deletion
  const handleDelete = async () => {
    if (!token) return alert("Unauthorized");

    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/events/${selectedEvent._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserEvents((prevEvents) => prevEvents.filter((event) => event._id !== selectedEvent._id));
      setSelectedEvent(null);
      alert("Event deleted successfully!");
    } catch (error) {
      console.error("Error deleting event:", error.response?.data?.message || error.message);
    }
  };

  // Handle input changes for the update form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle new event addition
  const handleEventAdded = (newEvent) => {
    if (newEvent) {
      setUserEvents((prevEvents) => [...prevEvents, newEvent]);
    }
    setShowAddEventForm(false); // Close form after event is added or canceled
  };

  return (
    <div className="user-events-page">
      <h2>My Events</h2>
      <button onClick={() => setShowAddEventForm(true)}>Add New Event</button>

      {showAddEventForm && <AddEvent token={token} onEventAdded={handleEventAdded} />}

      {userEvents.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul className="user-event-list">
          {userEvents.map((event) => (
            <li key={event._id} className="user-event-item" onClick={() => handleEventClick(event)}>
              <h3>{event.title}</h3>
              <p>Date: {event.date}</p>
              <p>Location: {event.location}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-content">
            <h3>{isEditing ? "Edit Event" : selectedEvent.title}</h3>

            {isEditing ? (
              <>
                <input
                  type="text"
                  name="title"
                  value={updatedEvent.title}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="description"
                  value={updatedEvent.description}
                  onChange={handleChange}
                  required
                />
                <input
                  type="date"
                  name="date"
                  value={updatedEvent.date}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="location"
                  value={updatedEvent.location}
                  onChange={handleChange}
                  required
                />
                <input
                  type="number"
                  name="price"
                  value={updatedEvent.price}
                  onChange={handleChange}
                  required
                />
                <div className="modal-buttons">
                  <button onClick={handleUpdate}>Save Changes</button>
                  <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <p>{selectedEvent.description}</p>
                <p>Date: {selectedEvent.date}</p>
                <p>Location: {selectedEvent.location}</p>
                <p>Price: ${selectedEvent.price}</p>
                <div className="modal-buttons">
                  <button onClick={() => setIsEditing(true)}>Update</button>
                  <button onClick={handleDelete}>Delete</button>
                  <button onClick={handleModalClose}>Close</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
