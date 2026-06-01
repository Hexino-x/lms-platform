import { connectDB } from '@/app/lib/mongoose';
import Course from '@/app/models/Course';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const courses = await Course.find({});
    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const course = await Course.create(body);
    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}