import { connectDB } from '@/app/lib/mongoose';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ message: '✅ دیتابیس وصل شد!' });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      { error: error.message || 'خطا در اتصال به دیتابیس' },
      { status: 500 }
    );
  }
}