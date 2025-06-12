'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SimModePreview() {
  const [stock, setStock] = useState('AAPL');
  const [risk, setRisk] = useState('Moderate');
  const randomMove = (Math.random() * 4 - 1.5).toFixed(2); // -1.50% to +2.50%

  return (
    <main className="bg-black text-white min-h-screen p-6 font-sans">
      {/* Back Link */}
      <Link href="/" className="text-sm text-gray-400 hover:text-white mb-4 inline-block">
        ← Back to Home
      </Link>

      {/* Mission Tagline */}
      <div className="bg-green-800 text-black text-center py-2 rounded mb-6 text-sm font-semibold tracking-wide">
        Built for the culture. Powered by AI. Empowering first-time investors.
      </div>

      {/* Logo + Header */}
      <h1 className="text-2xl font-bold text-green-500 tracking-tight mb-1">TraderBlockAI Sim Preview</h1>
      <p className="text-sm text-gray-400 mb-6">See what your AI co-pilot would do today.</p>

      {/* Stock Picker */}
      <div className="mb-4">
        <label className="block mb-1 text-sm">Pick a stock</label>
        <select
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="bg-gray-800 text-white p-2 rounded w-full"
        >
          <option value="AAPL">AAPL</option>
          <option value="TSLA">TSLA</option>
          <option value="GOOGL">GOOGL</option>
          <option value="MSFT">MSFT</option>
          <option value="AMZN">AMZN</option>
        </select>
      </div>

      {/* Risk Mode Selector */}
      <div className="mb-6">
        <label className="block mb-1 text-sm">Choose Risk Mode</label>
        <div className="flex space-x-3">
          {['Conservative', 'Moderate', 'Aggressive'].map((mode) => (
            <button
              key={mode}
              onClick={() => setRisk(mode)}
              className={`px-4 py-2 rounded ${
                risk === mode ? 'bg-green-600' : 'bg-gray-700'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* AI Forecast Card */}
      <div className="bg-gray-900 p-4 rounded mb-4">
        <h2 className="text-lg font-semibold mb-2">📈 AI Trade Forecast</h2>
        <p>
          TraderBlockAI suggests: <span className="text-green-400 font-bold">BUY {stock}</span>
        </p>
        <p>Expected Movement: <span className="text-yellow-300">{randomMove}%</span></p>
        <p>Risk Mode: <span className="text-blue-400">{risk}</span></p>
      </div>

      {/* Explain My Trade */}
      <div className="bg-gray-800 p-4 rounded mb-4 text-sm">
        <h3 className="font-semibold mb-1">🔍 Explain My Trade</h3>
        <p>
          The model predicts short-term momentum for {stock} based on positive sentiment
          and recent technical patterns. This is considered a {risk.toLowerCase()} entry.
        </p>
      </div>

      {/* Strategy Snapshot */}
      <div className="bg-gray-800 p-4 rounded text-sm mb-6">
        <h3 className="font-semibold mb-2">🧾 Strategy Snapshot</h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-300">
          <li>Model: LSTM + News Sentiment</li>
          <li>Confidence: 82%</li>
          <li>Volatility Rating: Moderate</li>
          <li>Backtest: 68% win rate (last 30 days)</li>
        </ul>
      </div>

      {/* Alpaca CTA */}
      <div className="bg-gray-950 p-4 rounded text-center">
        <p className="mb-3">🎯 Want to test this with live paper trading?</p>
        <a
          href="https://app.alpaca.markets/signup"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-600 hover:bg-green-500 px-6 py-2 rounded text-white font-semibold"
        >
          Connect Your Alpaca Account
        </a>
        <p className="text-xs mt-2 text-gray-400">
          *You’ll need a free Alpaca API key to start sim testing.
        </p>
      </div>
    </main>
  );
}
