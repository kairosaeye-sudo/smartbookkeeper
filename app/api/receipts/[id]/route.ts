import { NextResponse } from 'next/server';
import { updateReceipt } from '@/lib/db';
import { getSession } from '@/lib/auth';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    const { id } = await params;
    const updates = await request.json();
    if (updates.amount) updates.amount = parseFloat(updates.amount);
    const receipt = await updateReceipt(id, session.userId, updates);
    if (!receipt) {
      return NextResponse.json({ error: 'Receipt not found' }, { status: 404 });
    }
    return NextResponse.json({ receipt });
  } catch (error) {
    console.error('Update receipt error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
