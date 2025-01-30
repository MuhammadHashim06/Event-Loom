import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <NavLink to="/dashboard" activeClassName="active">Home</NavLink>
        </li>
        <li>
          <NavLink to="/events" activeClassName="active">Events</NavLink>
        </li>
        <li>
          <NavLink to="/profile" activeClassName="active">Profile</NavLink>
        </li>
        <li>
          <NavLink to="/settings" activeClassName="active">Settings</NavLink>
        </li>
      </ul>
    </nav>
  );
}
