import { useState } from "react";
import "./styles.scss";
import { FaBars, FaHome, FaSearch, FaHistory } from "react-icons/fa";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbar ${menuOpen ? "mobile-active" : ""}`}>
      <div className="logo-container">
        <a className="logo">JobsNow</a>
      </div>
      <FaBars className="menu-icon" onClick={toggleMenu} />
      <div className="nav-links">
        <Link to="/">
          {" "}
          <FaHome /> Home
        </Link>
        <Link to="/jobs/search?query=">
          <FaSearch /> Search
        </Link>
        <Link to="/Jobs">
          {" "}
          <FaHistory /> History
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
