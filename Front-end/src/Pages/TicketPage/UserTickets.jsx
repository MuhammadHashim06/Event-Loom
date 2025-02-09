// import { useState, useEffect } from "react";
// import axios from "axios";
// import "./UserTickets.css";

// export default function UserTickets() {
//   const userData = JSON.parse(sessionStorage.getItem("userData"));
//   const userId = userData?._id;
//   const token = userData.token;

//   const [userTickets, setUserTickets] = useState([]);
//   const [selectedTicket, setSelectedTicket] = useState(null);

//   // Fetch tickets data
//   useEffect(() => {
//     const fetchUserTickets = async () => {
//       if (!userId || !token) return;
//       try {
//         // Add Authorization header with Bearer token
//         const response = await axios.get(`http://localhost:5000/api/tickets/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUserTickets(response.data);
//       } catch (error) {
//         console.error("Error fetching user tickets:", error.response?.data?.message || error.message);
//       }
//     };

//     fetchUserTickets();
//   }, [userId, token]);

//   // Handle ticket click to view details
//   const handleTicketClick = (ticket) => {
//     setSelectedTicket(ticket);
//   };

//   // Handle modal close (for ticket details)
//   const handleModalClose = (e) => {
//     if (e.target.classList.contains("modal-overlay")) {
//       setSelectedTicket(null);
//     }
//   };

//   return (
//     <div className="user-tickets-page">
//       <h2>My Booked Tickets</h2>
//       {userTickets.length === 0 ? (
//         <p>No tickets found.</p>
//       ) : (
//         <ul className="user-ticket-list">
//           {userTickets.map((ticket) => (
//             <li
//               key={ticket._id}
//               className="user-ticket-item"
//               onClick={() => handleTicketClick(ticket)}
//             >
//               <h3>{ticket.event.title}</h3>
//               <p>Event Date: {ticket.event.date}</p>
//               <p>Location: {ticket.event.location}</p>
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* Ticket Detail Modal */}
//       {selectedTicket && (
//         <div className="modal-overlay" onClick={handleModalClose}>
//           <div className="modal-content">
//             <h3>Ticket for {selectedTicket.event.title}</h3>
//             <p>Event Date: {selectedTicket.event.date}</p>
//             <p>Location: {selectedTicket.event.location}</p>
//             <p>Price: ${selectedTicket.event.price}</p>
//             <div className="modal-buttons">
//               <button onClick={handleModalClose}>Close</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import axios from "axios";
import "./UserTickets.css";

export default function UserTickets() {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const userId = userData?._id;
  const token = userData.token;

  const [userTickets, setUserTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Fetch tickets data
  useEffect(() => {
    const fetchUserTickets = async () => {
      if (!userId || !token) return;
      try {
        // Add Authorization header with Bearer token
        const response = await axios.get(`http://localhost:5000/api/tickets/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserTickets(response.data);
      } catch (error) {
        console.error("Error fetching user tickets:", error.response?.data?.message || error.message);
      }
    };

    fetchUserTickets();
  }, [userId, token]);

  // Handle ticket click to view details
  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  // Handle modal close (for ticket details)
  const handleModalClose = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setSelectedTicket(null);
    }
  };

  return (
    <div className="user-tickets-page">
      <h2>My Booked Tickets</h2>
      {userTickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <ul className="user-ticket-list">
          {userTickets.map((ticket) => (
            <li
              key={ticket._id}
              className="user-ticket-item"
              onClick={() => handleTicketClick(ticket)}
            >
              <h3>{ticket.eventId.title}</h3> {/* Access event title via eventId */}
              <p>Event Date: {new Date(ticket.eventId.date).toLocaleDateString()}</p>
              <p>Location: {ticket.eventId.location}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Ticket Detail Modal */}
      {selectedTicket && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-content">
            <h3>Ticket for {selectedTicket.eventId.title}</h3> {/* Access event title via eventId */}
            <p>Event Date: {new Date(selectedTicket.eventId.date).toLocaleDateString()}</p>
            <p>Location: {selectedTicket.eventId.location}</p>
            <p>Price: ${selectedTicket.eventId.price}</p>
            <div className="modal-buttons">
              <button onClick={handleModalClose}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
