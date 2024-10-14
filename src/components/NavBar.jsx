import React, { useState } from "react";

import "./NavBar.css";
import { Link, NavLink } from "react-router-dom";

export const NavBar = ({ user, handleLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to="/" className="title">
        Home
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/findbyimage">Find by image</NavLink>
        </li>
        <li>
          <NavLink to="/findbytext">Find by text</NavLink>
        </li>
        <li>
          <NavLink to="/uploadimage">Upload</NavLink>
        </li>

        {user ? (
          <li onClick={handleLogout}>
            <NavLink to="/">Logout</NavLink>
          </li>
        ) : (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};