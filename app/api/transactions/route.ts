import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { getTransactions, createTransaction } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    const transactions = await getTransactions(session.userId);
    return NextResponse.json({ transactions });
  } catch (error) {
    console.error('Get transactions error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    const { type, amount, category, description, date } = await request.json();
    if (!type || !amount || !category || !description || !date) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }
    const transaction = await createTransaction({
      id: uuidv4(),
      userId: session.userId,
      type,
      amount: parseFloat(amount),
      category,
      description,
      date,
    });
    return NextResponse.json({ transaction }, { status: 201 });
  } catch (error) {
    console.error('Create transaction error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
