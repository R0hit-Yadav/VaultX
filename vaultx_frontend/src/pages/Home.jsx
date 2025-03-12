import { useState } from "react";
import "./Home.css";

export default function Home() {
  return (
    <div className="app-container">
    <div className="main-content">
    <div className="hero-card">
      <div className="hero-text">
        <h1>
          <span className="gradient-text">Vault</span>
          <br />
          <span className="gradient-text">Wallet</span>
        </h1>
        
        <div className="hero-description">
          <p>Secure, fast, and easy-to-use wallet for your Ethereum assets</p>
        </div>
        
        <div className="hero-buttons">
          <button className="primary-btn">Get Started</button>
          <button className="secondary-btn">Learn More</button>
        </div>
      </div>
      
      <div className="hero-graphic">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" className="eth-logo">
          <path d="M200 25L50 200L200 275L350 200L200 25Z" fill="#0ea5e9" />
          <path d="M200 25V275L350 200L200 25Z" fill="#6b21a8" fillOpacity="0.5" />
          <path d="M200 300L50 225L200 375L350 225L200 300Z" fill="#0ea5e9" />
          <path d="M200 300V375L350 225L200 300Z" fill="#6b21a8" fillOpacity="0.5" />
          <path d="M200 150L50 200L200 275L350 200L200 150Z" fill="white" fillOpacity="0.15" />
        </svg>
      </div>
    </div>

    <section className="features-section">
      <h2>Key Features</h2>
      <div className="cards-container">
        <div className="feature-card" onClick={() => window.location.href = '/balance'}>
          <div className="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <path d="M16 12h4" />
              <circle cx="16" cy="12" r="1" />
            </svg>
          </div>
          <h3>Wallet</h3>
          <p>Check your balance and manage your Ethereum assets</p>
        </div>

        <div className="feature-card" onClick={() => window.location.href = '/send'}>
          <div className="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 14l-5-5-5 5" />
              <path d="M12 9v12" />
              <path d="M20 3H4" />
              <path d="M8 3V7" />
              <path d="M16 3V7" />
            </svg>
          </div>
          <h3>Transactions</h3>
          <p>View your transaction history and pending transactions</p>
        </div>

        <div className="feature-card" onClick={() => window.location.href = '/history'}>
          <div className="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 16l-4-4 4-4" />
              <path d="M3 12h18" />
              <path d="M17 8l4 4-4 4" />
            </svg>
          </div>
          <h3>Swap</h3>
          <p>Exchange Ethereum and other cryptocurrencies</p>
        </div>

        <div className="feature-card" onClick={() => window.location.href = '/nft'}>
          <div className="card-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 7h-9l-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z" />
              <path d="M12 14.5L7 12l5-2.5L17 12l-5 2.5z" />
            </svg>
          </div>
          <h3>NFTs</h3>
          <p>View and manage your NFT collection</p>
        </div>
      </div>
    </section>

    <section className="stats-section">
      <div className="stat-item">
        <h3>5M+</h3>
        <p>Active Users</p>
      </div>
      <div className="stat-item">
        <h3>$10B+</h3>
        <p>Assets Managed</p>
      </div>
      <div className="stat-item">
        <h3>100K+</h3>
        <p>Daily Transactions</p>
      </div>
    </section>

    <section className="cta-section">
      <h2>Ready to Get Started?</h2>
      <p>Create your wallet in seconds and start managing your Ethereum assets</p>
      <button className="connect-button">Launch App</button>
    </section>
  </div>

  <footer className="footer">
    <p>&copy; 2025 VaultX. All rights reserved.</p>
    <div className="footer-links">
      <a href="/about">About</a>
      <a href="/privacy">Privacy</a>
      <a href="/terms">Terms</a>
      <a href="/contact">Contact</a>
    </div>
  </footer>
</div>
  );
}