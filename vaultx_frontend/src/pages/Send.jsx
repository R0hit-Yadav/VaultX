import { useState } from "react";
import { ethers } from "ethers";
import "./Send.css";

export default function Send() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const sendTransaction = async () => {
    if (!ethers.isAddress(recipient)) {
      alert("Invalid recipient address");
      return;
    }
    
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({
        to: recipient,
        value: ethers.parseEther(amount),
      });

      setStatus(`Transaction Sent! Hash: ${tx.hash}`);
    } catch (error) {
      setStatus("Transaction Failed!");
    }
  };

  return (
    <div className="send-container">
      <h1>Send ETH</h1>
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        type="text"
        placeholder="Amount (ETH)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={sendTransaction}>Send</button>
      {status && <p>{status}</p>}
    </div>
  );
}
