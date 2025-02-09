import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <NavLink to="/dashboard/home" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/events" className={({ isActive }) => (isActive ? 'active' : '')}>Events</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/tickets" className={({ isActive }) => (isActive ? 'active' : '')}>My Tickets</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/setting" className={({ isActive }) => (isActive ? 'active' : '')}>Settings</NavLink>
        </li>
      </ul>
    </nav>
  );
}
