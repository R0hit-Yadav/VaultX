import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h1>VaultX</h1>
        </div>
        
        <div className="navbar-toggle" onClick={toggleNavbar}>
          <div className={`toggle-icon ${isOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        
        <ul className={isOpen ? "active" : ""}>
          <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/send" onClick={() => setIsOpen(false)}>Send</Link></li>
          <li><Link to="/history" onClick={() => setIsOpen(false)}>History</Link></li>
          <li><Link to="/balance" onClick={() => setIsOpen(false)}>Balance</Link></li>
          <li><Link to="/dapp" onClick={() => setIsOpen(false)}>DApp</Link></li>
        </ul>
      </div>
    </nav>
  );
}