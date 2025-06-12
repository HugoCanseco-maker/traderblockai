'use client';

import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formBaseURL =
      'https://docs.google.com/forms/d/e/1FAIpQLSf8v4RyvQYfBzlegBb04JFaYrXNBI8NFFYVzoYhenCcRRCKzg/viewform?usp=pp_url&entry.1429822610=';
    const fullURL = `${formBaseURL}${encodeURIComponent(email)}`;
    window.open(fullURL, '_blank');
  };

  return (
    <main className="bg-black text-white font-sans overflow-x-hidden">
      {/* Hero */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        {/* Ticker Background */}
        <div className="absolute top-0 left-0 w-full z-0 opacity-30 whitespace-nowrap animate-marquee pointer-events-none text-green-400 font-mono font-bold text-xl">
          $AAPL +1.24% &nbsp;|&nbsp; $TSLA -0.43% &nbsp;|&nbsp; $GOOGL +0.65% &nbsp;|&nbsp; $MSFT +0.89% &nbsp;|&nbsp; $NVDA +2.31% &nbsp;|&nbsp; $AMZN +0.56% &nbsp;|&nbsp; $META +1.17% &nbsp;|&nbsp;
          $UBER +0.24% &nbsp;|&nbsp; $SQ -1.04% &nbsp;|&nbsp; $COIN +3.12%
        </div>

        {/* Text Content */}
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Welcome to <span className="text-green-500">TraderBlockAI</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto">
            An AI-powered trading assistant helping you invest smarter with personalized models and risk modes — built for the culture, powered by LSTM + Alpaca.
          </p>
        </div>
      </section>

      {/* What is TraderBlockAI */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">What is TraderBlockAI?</h2>
        <p className="text-gray-300 text-lg">
          TraderBlockAI is your all-in-one AI co-pilot for trading. We analyze market trends, news sentiment, and technical signals to help you make smarter, faster, and more confident trading decisions.
        </p>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-zinc-900 text-center">
        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        <ul className="text-gray-300 space-y-4 max-w-xl mx-auto">
          <li>🔍 We scan thousands of stocks and filter for hidden opportunities</li>
          <li>🧠 Our LSTM model predicts short-term price movement with confidence scoring</li>
          <li>📊 You choose your risk level: Chill, Moderate, or Aggressive</li>
          <li>📈 We trade on your behalf via Alpaca or simulate in Sim Mode</li>
        </ul>
      </section>

      {/* Features */}
      <section className="py-16 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">What’s Featured</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-zinc-800 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-green-400">Smart Forecasting</h3>
            <p className="text-gray-300">ML-driven price predictions trained on real stock market data daily.</p>
          </div>
          <div className="bg-zinc-800 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-green-400">Risk Tuning</h3>
            <p className="text-gray-300">Adjust the model’s aggressiveness with a tap: Chill, Moderate, Aggressive.</p>
          </div>
          <div className="bg-zinc-800 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-green-400">Sentiment Integration</h3>
            <p className="text-gray-300">Live news + Twitter sentiment impacts prediction weight in real time.</p>
          </div>
        </div>
      </section>

      {/* Why It Helps */}
      <section className="py-16 px-6 bg-zinc-900 text-center">
        <h2 className="text-3xl font-bold mb-4">Why It’s Built For You</h2>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto">
          Most tools are made for Wall Street. TraderBlockAI is built for everyone else — especially underserved communities. We help you grow wealth confidently, without needing to be a trading expert.
        </p>
      </section>

      {/* Final Signup CTA */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Get Early Access</h2>
        <p className="text-gray-300 text-lg mb-6">We’re launching soon. Be the first to test it out — and help shape the future of personal AI investing.</p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-xl bg-zinc-900 text-white border border-zinc-600 placeholder-gray-400 w-72 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-400 text-black font-semibold py-3 px-6 rounded-2xl shadow-lg transition"
          >
            Join the Beta
          </button>
        </form>

        {/* Sim Mode CTA */}
        <div className="mt-10 text-center">
          <a
            href="/sim"
            className="inline-block bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-lg shadow transition mt-6"
          >
            🚀 Try Sim Mode Preview
          </a>
          <p className="text-xs text-gray-400 mt-2">
            *Preview your AI trade assistant in action
          </p>
        </div>
      </section>
    </main>
  );
}
