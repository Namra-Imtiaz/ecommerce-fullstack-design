import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db/mongodb';
import Category from '@/models/Category';

export async function GET() {
  try {
    await connectToDatabase();
    const categories = await Category.find({});
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}