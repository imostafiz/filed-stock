import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const body = await request.json();

  const orderId = `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  return NextResponse.json({
    orderId,
    success: true,
    message: 'Order placed successfully',
    items: body,
  });
};
