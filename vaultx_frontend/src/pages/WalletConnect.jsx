import { useState, useEffect } from "react";
import WalletConnect from "@walletconnect/client";
import Web3 from "web3";
// import "./WalletConnect.css";

export default function WalletConnectPage() {
  const [connector, setConnector] = useState(null);
  const [account, setAccount] = useState("");
  const [connected, setConnected] = useState(false);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    const wc = new WalletConnect({
      bridge: "https://bridge.walletconnect.org",
    });

    setConnector(wc);

    if (wc.connected) {
      setConnected(true);
      setAccount(wc.accounts[0]);
      setWeb3(new Web3(wc.connector));
    }

    wc.on("connect", (error, payload) => {
      if (error) throw error;
      const { accounts } = payload.params[0];
      setAccount(accounts[0]);
      setConnected(true);
    });

    wc.on("disconnect", () => {
      setConnected(false);
      setAccount("");
    });
  }, []);

  const connectWallet = async () => {
    if (!connector) return;
    await connector.createSession();
  };

  const disconnectWallet = async () => {
    if (!connector) return;
    await connector.killSession();
    setConnected(false);
    setAccount("");
  };

  return (
    <div className="walletconnect-container">
      <h1>WalletConnect Integration</h1>

      {connected ? (
        <div>
          <p>Connected to: {account}</p>
          <button onClick={disconnectWallet}>Disconnect</button>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}
