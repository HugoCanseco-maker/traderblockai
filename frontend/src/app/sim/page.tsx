'use client';

import { useState } from 'react';

export default function SimModePreview() {
  const [stock, setStock] = useState('AAPL');
  const [risk, setRisk] = useState('Moderate');
  const [horizon, setHorizon] = useState(3); // future-proofing
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {
    recommendation: string;
    movement: string;
    confidence: number;
    explanation: string;
  }>(null);

  const fetchPrediction = async () => {
    setLoading(true);
    setResult(null);

    const res = await fetch('/api/sim', {
      method: 'POST',
      body: JSON.stringify({ stock, risk, horizon }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <main className="bg-black text-white min-h-screen p-6 font-sans">
      <a href="/" className="text-sm text-gray-400 hover:text-white mb-4 inline-block">
        ← Back to Home
      </a>

      <div className="bg-green-800 text-black text-center py-2 rounded mb-6 text-sm font-semibold tracking-wide">
        Built for the culture. Powered by AI. Empowering first-time investors.
      </div>

      <h1 className="text-2xl font-bold text-green-500 tracking-tight mb-1">TraderBlockAI Sim Preview</h1>
      <p className="text-sm text-gray-400 mb-6">See what your AI co-pilot would do today.</p>

      {/* Select Inputs */}
      <div className="mb-4">
        <label className="block mb-1 text-sm">Pick a stock</label>
        <select value={stock} onChange={(e) => setStock(e.target.value)} className="bg-gray-800 text-white p-2 rounded w-full">
          {['AAPL', 'TSLA', 'GOOGL', 'MSFT', 'AMZN'].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block mb-1 text-sm">Choose Risk Mode</label>
        <div className="flex space-x-3">
          {['Conservative', 'Moderate', 'Aggressive'].map((mode) => (
            <button
              key={mode}
              onClick={() => setRisk(mode)}
              className={`px-4 py-2 rounded ${risk === mode ? 'bg-green-600' : 'bg-gray-700'}`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Forecast Button */}
      <button
        onClick={fetchPrediction}
        disabled={loading}
        className="bg-green-600 hover:bg-green-500 px-6 py-2 rounded font-semibold mb-6"
      >
        {loading ? 'Analyzing...' : 'Generate Forecast'}
      </button>

      {/* AI Forecast Results */}
      {result && (
        <>
          <div className="bg-gray-900 p-4 rounded mb-4">
            <h2 className="text-lg font-semibold mb-2">📈 AI Trade Forecast</h2>
            <p>
              TraderBlockAI suggests: <span className="text-green-400 font-bold">{result.recommendation} {stock}</span>
            </p>
            <p>Expected Movement: <span className="text-yellow-300">{result.movement}%</span></p>
            <p>Confidence: <span className="text-blue-400">{result.confidence}%</span></p>
            <p>Risk Mode: <span className="text-blue-300">{risk}</span></p>
          </div>

          <div className="bg-gray-800 p-4 rounded mb-6 text-sm">
            <h3 className="font-semibold mb-1">🔍 Explain My Trade</h3>
            <p>{result.explanation}</p>
          </div>
        </>
      )}

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
