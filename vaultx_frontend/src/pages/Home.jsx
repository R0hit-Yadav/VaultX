import { useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import "./Home.css";

export default function Home() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(null);

  const fetchBalance = async () => {
    if (!ethers.isAddress(address)) {
      alert("Invalid Ethereum address");
      return;
    }
    try {
      const response = await axios.get(`http://localhost:3030/balance/${address}`);
      setBalance(response.data.balance);
    } catch (error) {
      console.error("Error fetching balance", error);
    }
  };

  return (
    <div className="home-container">
      <h1>Ethereum Wallet</h1>
      <input
        type="text"
        placeholder="Enter ETH address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={fetchBalance}>Check Balance</button>
      {balance && <p>Balance: {balance}</p>}
    </div>
  );
}
