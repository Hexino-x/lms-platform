import { connectDB } from '@/app/lib/mongoose';
import User from '@/app/models/User';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await connectDB();
    const { name, email, password } = await request.json();
    
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'ایمیل قبلاً ثبت شده' }, { status: 400 });
    }
    
    const user = await User.create({ name, email, password });
    return NextResponse.json({ id: user._id, name: user.name, email: user.email }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
