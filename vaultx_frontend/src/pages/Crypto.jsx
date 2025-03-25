import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "./Crypto.css";

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title);

// Expanded Coin List
const coins = [
  "bitcoin", "ethereum", "solana", "cardano", "binancecoin", 
  "ripple", "dogecoin", "polkadot", "avalanche-2", "chainlink"
];

// Coin Colors and Logos (as SVG paths)
const COIN_DETAILS = {
  bitcoin: { 
    color: "#F7931A", 
    logo: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.25 10.65c-.27-.79-.97-1.33-1.8-1.4V8.5h-1.5v2.75h-1.5V8.5h-1.5v2.75h-1V15c0 .55.45 1 1 1h4.5c.82 0 1.5-.67 1.5-1.5 0-.63-.39-1.17-.95-1.4zm.45 2.35c0 .55-.45 1-1 1H9.5v-2h3.25c.55 0 1 .45 1 1zm-4-3.5h2.25V9.5h-2.25z"
  },
  ethereum: { 
    color: "#627EEA", 
    logo: "M12 2l-5.5 9 5.5 3 5.5-3z"
  },
  solana: { 
    color: "#00FFA3", 
    logo: "M7 11l5-5 5 5zm0 2l5 5 5-5z"
  },
  cardano: { 
    color: "#3CC8C8", 
    logo: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
  },
  binancecoin: { 
    color: "#F3BA2F", 
    logo: "M12 2l-5.5 9 5.5 3 5.5-3z"
  },
  ripple: { 
    color: "#0085A6", 
    logo: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.25 10.65c-.27-.79-.97-1.33-1.8-1.4V8.5h-1.5v2.75h-1.5V8.5h-1.5v2.75h-1V15c0 .55.45 1 1 1h4.5c.82 0 1.5-.67 1.5-1.5 0-.63-.39-1.17-.95-1.4z"
  },
  dogecoin: { 
    color: "#C2A633", 
    logo: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 8.5c-.28 0-.5.22-.5.5v2c0 .28.22.5.5.5h2V14h-3v2h-2v-2h-3v-1.5h2v-2c0-.28-.22-.5-.5-.5h-1.5V9H12V7h2v2h2.5l.5.5h2v1.5z"
  },
  polkadot: { 
    color: "#E6007A", 
    logo: "M12 2l-5.5 9 5.5 3 5.5-3z"
  },
  "avalanche-2": { 
    color: "#E84142", 
    logo: "M12 2l-8 8 3 3 5-5 5 5 3-3z"
  },
  chainlink: { 
    color: "#2AB44F", 
    logo: "M12 2l-8 8h6v4l4 4 4-4v-4h6z"
  }
};

// Crypto Tracking Component
function CryptoTracker() {
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");
  const [chartData, setChartData] = useState(null);
  const [coinPrice, setCoinPrice] = useState(null);

  // Fetch Crypto Data Function
  const fetchCryptoData = async (coin = "bitcoin", days = 7) => {
    const url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${days}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.prices.map(([timestamp, price]) => ({
        time: new Date(timestamp).toLocaleDateString(),
        price,
      }));
    } catch (error) {
      console.error("Error fetching crypto data:", error);
      return [];
    }
  };

  // Fetch Coin Price Details
  const fetchCoinPrice = async (coin) => {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&include_24hr_change=true`);
      const data = await response.json();
      return {
        price: data[coin].usd,
        priceChange: data[coin].usd_24h_change
      };
    } catch (error) {
      console.error("Error fetching coin price:", error);
      return null;
    }
  };

  // Load Data Effect
  useEffect(() => {
    const loadData = async () => {
      // Fetch historical price data
      const data = await fetchCryptoData(selectedCoin);
      setChartData({
        labels: data.map((d) => d.time),
        datasets: [
          {
            label: `${selectedCoin.toUpperCase()} Price (USD)`,
            data: data.map((d) => d.price),
            borderColor: COIN_DETAILS[selectedCoin].color || "blue",
            backgroundColor: `${COIN_DETAILS[selectedCoin].color}33`,
            tension: 0.4,
          },
        ],
      });

      // Fetch current coin price
      const priceData = await fetchCoinPrice(selectedCoin);
      setCoinPrice(priceData);
    };

    loadData();
  }, [selectedCoin]);

  return (
    <div className="crypto-app-wrapper">
      <div className="crypto-app-container">
        <div className="crypto-header">
          <h1 className="crypto-header-title">Blockchain Crypto Tracker</h1>
        </div>

        <div className="crypto-selector-grid">
          {coins.map((coin) => (
            <button
              key={coin}
              className={`crypto-coin-button ${selectedCoin === coin ? 'active' : ''}`}
              onClick={() => setSelectedCoin(coin)}
            >
              <svg 
                viewBox="0 0 24 24" 
                className="crypto-coin-icon"
              >
                <path 
                  d={COIN_DETAILS[coin].logo} 
                  fill={COIN_DETAILS[coin].color} 
                />
              </svg>
              {coin.toUpperCase()}
            </button>
          ))}
        </div>

        {coinPrice && (
          <div className="crypto-price-display">
            <div className="crypto-price-value">
              ${coinPrice.price.toLocaleString()}
            </div>
            <div 
              className={`crypto-price-change ${
                coinPrice.priceChange >= 0 ? "positive" : "negative"
              }`}
            >
              {coinPrice.priceChange.toFixed(2)}%
            </div>
          </div>
        )}

        <div className="crypto-chart-container">
          {chartData ? (
            <Line 
              data={chartData} 
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                  title: { display: false }
                }
              }} 
            />
          ) : (
            <div className="crypto-loading">
              <div className="crypto-loading-spinner"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default CryptoTracker;