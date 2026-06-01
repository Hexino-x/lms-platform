import { connectDB } from '@/app/lib/mongoose';
import User from '@/app/models/User';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    await connectDB();
    const { email, password } = await request.json();
    
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'ایمیل یا رمز اشتباه است' }, { status: 401 });
    }
    
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return NextResponse.json({ error: 'ایمیل یا رمز اشتباه است' }, { status: 401 });
    }
    
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    return NextResponse.json({ token, user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin } });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
