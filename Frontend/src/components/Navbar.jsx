import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <span className="logo">✨ Birthday Finder</span>
      <div className="nav-links">
        <NavLink to="/" end>
          Home
        </NavLink>
      </div>
    </nav>
  );
}