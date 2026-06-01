import { connectDB } from '@/app/lib/mongoose';
import Course from '@/app/models/Course';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const course = await Course.findById(id);
    if (!course) return NextResponse.json({ error: 'یافت نشد' }, { status: 404 });
    return NextResponse.json(course);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const deleted = await Course.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: 'یافت نشد' }, { status: 404 });
    return NextResponse.json({ message: 'حذف شد' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const updated = await Course.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!updated) return NextResponse.json({ error: 'یافت نشد' }, { status: 404 });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}