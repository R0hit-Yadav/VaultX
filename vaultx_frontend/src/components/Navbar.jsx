import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      
      <ul>
      <div className="navbar-logo">
          <h1>VaultX</h1>
        </div>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/send">Send</Link></li>
        <li><Link to="/history">History</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li><Link to="/dapp">DApp</Link></li>
      </ul>
    </nav>
  );
}

