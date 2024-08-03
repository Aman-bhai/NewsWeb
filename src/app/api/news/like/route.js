import mongoose from 'mongoose';
import { News } from '../../../models/News.modal';
import { NextResponse } from 'next/server';

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) { 
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Server is connected to the database");
  }
};

export async function POST(req) {
  try {
    await connectToDatabase();

    const { email, src_name, content, title } = await req.json();

    console.log('Received data:Success');

    const query = {};
    if (title) query.title = title;
    if (src_name) query.src_name = src_name;
    if (content) query.content = content;

    if (Object.keys(query).length === 0) {
      console.log('No search parameters provided');
      return NextResponse.json({ message: 'No search parameters provided' }, { status: 400 });
    }

    const newsdoc = await News.findOne(query);
    console.log("Fetched news document");

    if (!newsdoc) {
      return NextResponse.json({ message: 'News not found' }, { status: 404 });
    }

    return NextResponse.json({ _id: newsdoc._id });

  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ message: 'Failed to fetch news' }, { status: 500 });
  }
}
