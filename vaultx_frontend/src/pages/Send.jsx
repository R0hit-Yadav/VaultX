import { useState } from "react";
import { ethers } from "ethers";
import "./Send.css";

export default function Send() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState(""); // "pending", "success", "error"
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendTransaction = async () => {
    if (!ethers.isAddress(recipient)) {
      setStatus("Invalid recipient address");
      setStatusType("error");
      return;
    }
    
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setStatus("Please enter a valid amount");
      setStatusType("error");
      return;
    }
    
    setIsLoading(true);
    setStatus("Preparing transaction...");
    setStatusType("pending");
    setTransactionDetails(null);
    
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      // Get current gas price
      const feeData = await provider.getFeeData();
      const gasPrice = feeData.gasPrice;
      
      const tx = await signer.sendTransaction({
        to: recipient,
        value: ethers.parseEther(amount),
        gasLimit: 21000, // Standard ETH transfer gas limit
      });
      
      setStatus(`Transaction sent! Waiting for confirmation...`);
      
      const receipt = await tx.wait();

      const details = {
        tx_hash: receipt.hash,
        from: receipt.from,
        to: receipt.to,
        value: amount + " ETH",
        gas_used: receipt.gasUsed.toString(),
        gas_price: ethers.formatUnits(receipt.effectiveGasPrice, "gwei") + " Gwei",
        block_number: receipt.blockNumber,
        status: receipt.status === 1 ? "Success" : "Failed",
        timestamp: new Date().toLocaleString(),
        network: await provider.getNetwork().then(network => network.name)
      };

      setTransactionDetails(details);
      setStatus(`Transaction confirmed!`);
      setStatusType("success");

    } catch (error) {
      console.error("Transaction error:", error);
      setStatus(`Transaction Failed: ${error.message || "Unknown error"}`);
      setStatusType("error");
    } finally {
      setIsLoading(false);
    }

    const EthIcon = () => (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g className="eth-icon">
          <path d="M18 6L34 18L18 30L2 18L18 6Z" fill="#6b21a8" fillOpacity="0.7" />
          <path d="M18 18L34 12L18 6L2 12L18 18Z" fill="#0ea5e9" fillOpacity="0.5" />
          <path d="M18 18V30" stroke="#6b21a8" strokeWidth="2" />
        </g>
        <style jsx>{`
          .eth-icon {
            transform-origin: center;
            animation: float 3s ease-in-out infinite;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }
        `}</style>
      </svg>
    );
    
    // Transaction Success Animation
    const SuccessIcon = () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle className="success-circle" cx="12" cy="12" r="10" stroke="#10b981" strokeWidth="2" />
        <path className="success-check" d="M8 12L11 15L16 9" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <style jsx>{`
          .success-circle {
            stroke-dasharray: 66;
            stroke-dashoffset: 66;
            animation: circle-draw 0.6s ease forwards;
          }
          .success-check {
            stroke-dasharray: 15;
            stroke-dashoffset: 15;
            animation: check-draw 0.3s ease forwards 0.6s;
          }
          @keyframes circle-draw {
            to { stroke-dashoffset: 0; }
          }
          @keyframes check-draw {
            to { stroke-dashoffset: 0; }
          }
        `}</style>
      </svg>
    );
    
    // Transaction Pending Animation
    const PendingIcon = () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#6b21a8" strokeWidth="2" strokeOpacity="0.2" />
        <path className="pending-arc" d="M12 2C6.47715 2 2 6.47715 2 12" stroke="#6b21a8" strokeWidth="2" strokeLinecap="round" />
        <style jsx>{`
          .pending-arc {
            transform-origin: center;
            animation: spin 1.2s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </svg>
    );
    
    // ETH Transaction Pattern Background
    const EthBackgroundPattern = () => (
      <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g className="eth-pattern">
          <path d="M80 40L120 60V100L80 120L40 100V60L80 40Z" stroke="#6b21a8" strokeWidth="3" strokeOpacity="0.2" />
          <path d="M80 80L120 60L80 40L40 60L80 80Z" stroke="#0ea5e9" strokeWidth="3" strokeOpacity="0.2" />
          <path d="M80 80V120" stroke="#6b21a8" strokeWidth="3" strokeOpacity="0.2" />
        </g>
        <style jsx>{`
          .eth-pattern {
            transform-origin: center;
            animation: rotate 30s linear infinite;
          }
          @keyframes rotate {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </svg>
    );
    
    // Transaction Details Icon
    const TransactionDetailsIcon = () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#6b21a8" strokeWidth="2" />
        <path className="arrow" d="M12 16L16 12L12 8" stroke="#6b21a8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path className="line" d="M8 12H16" stroke="#6b21a8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <style jsx>{`
          .arrow, .line {
            stroke-dasharray: 15;
            stroke-dashoffset: 15;
            animation: draw 1s ease-in-out forwards;
          }
          .line {
            animation-delay: 0.3s;
          }
          @keyframes draw {
            to { stroke-dashoffset: 0; }
          }
        `}</style>
      </svg>
    );
    
    // Small ETH Diamond for details
    const EthDiamond = () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path className="diamond" d="M8 2L14 8L8 14L2 8L8 2Z" fill="#0ea5e9" fillOpacity="0.5" />
        <style jsx>{`
          .diamond {
            transform-origin: center;
            animation: pulse 2s ease-in-out infinite;
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
        `}</style>
      </svg>
    );
  };

  return (
    <div className="send-container">
      <div className="background-pattern"></div>
      
      <h1>
        <span className="eth-icon"></span>
        Send ETH
      </h1>
      
      <input
        type="text"
        placeholder="Recipient Address (0x...)"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className="address-input"
      />
      
      <div className="amount-input-wrapper">
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="amount-input"
        />
      </div>
      
      <button 
        onClick={sendTransaction}
        disabled={isLoading}
        className={isLoading ? "loading-btn" : ""}
      >
        {isLoading ? (
          <>
            <span className="loading"></span>
            Processing...
          </>
        ) : (
          "Send Transaction"
        )}
      </button>
      
      {status && (
        <p className={statusType}>
          {statusType === "pending" && <span className="status-icon pending"></span>}
          {statusType === "success" && <span className="status-icon success"></span>}
          {statusType === "error" && <span className="status-icon error"></span>}
          {status}
        </p>
      )}

      {transactionDetails && (
        <div className="tx-details">
          <h3>Transaction Details</h3>
          <p><strong>Transaction Hash:</strong> <span className="mono-text">{transactionDetails.tx_hash}</span></p>
          <p><strong>From:</strong> <span className="mono-text">{transactionDetails.from}</span></p>
          <p><strong>To:</strong> <span className="mono-text">{transactionDetails.to}</span></p>
          <p>
            <strong>Value:</strong> 
            <span><span className="eth-symbol"></span>{transactionDetails.value}</span>
          </p>
          <p><strong>Gas Used:</strong> <span>{transactionDetails.gas_used}</span></p>
          <p><strong>Gas Price:</strong> <span>{transactionDetails.gas_price}</span></p>
          <p><strong>Block Number:</strong> <span>{transactionDetails.block_number}</span></p>
          <p><strong>Status:</strong> <span className={`status ${transactionDetails.status.toLowerCase()}`}>{transactionDetails.status}</span></p>
          <p><strong>Network:</strong> <span>{transactionDetails.network}</span></p>
          <p><strong>Time:</strong> <span>{transactionDetails.timestamp}</span></p>
        </div>
      )}
    </div>
  );
}