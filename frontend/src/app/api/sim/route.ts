import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { stock, risk, horizon } = await req.json();

  // Mock logic to simulate prediction
  const recommendation = Math.random() > 0.5 ? 'BUY' : 'SELL';
  const movement = (Math.random() * 4 - 1.5).toFixed(2); // -1.5% to +2.5%
  const confidence = Math.floor(Math.random() * 21) + 75; // 75–95%
  const explanation = `The model predicts short-term ${recommendation === 'BUY' ? 'momentum' : 'pullback'} for ${stock}, influenced by news and volume.`;

  return NextResponse.json({
    stock,
    risk,
    horizon,
    recommendation,
    movement,
    confidence,
    explanation,
  });
}
