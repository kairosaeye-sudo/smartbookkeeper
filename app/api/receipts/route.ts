import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { getReceipts, createReceipt } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    const receipts = await getReceipts(session.userId);
    return NextResponse.json({ receipts });
  } catch (error) {
    console.error('Get receipts error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    const { merchant, amount, date, category, imageUrl } = await request.json();
    if (!merchant || !amount || !date || !category) {
      return NextResponse.json({ error: 'Merchant, amount, date, and category are required' }, { status: 400 });
    }
    const receipt = await createReceipt({
      id: uuidv4(),
      userId: session.userId,
      merchant,
      amount: parseFloat(amount),
      date,
      category,
      imageUrl,
    });
    return NextResponse.json({ receipt }, { status: 201 });
  } catch (error) {
    console.error('Create receipt error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
