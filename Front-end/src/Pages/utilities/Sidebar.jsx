import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export function Sidebar() {
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <NavLink to="/home" activeClassName="active">Home</NavLink>
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
