import mongoose from 'mongoose';
import { Comments } from '../../../models/Comment.modal';
import { News } from "../../../models/News.modal";
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

    const { email, src_name, content, title, desc, comment } = await req.json();

    console.log('Received data:Success');

    const query = {};
    if (title) query.title = title;
    if (src_name) query.src_name = src_name;
    if (content) query.content = content;

    let newsdoc = await News.findOne(query);
    
    if (!newsdoc) {
      newsdoc = await News.create({
        title,
        src_name,
        content,
        desc,
        image: '', 
        date: new Date().toISOString(), 
        author: '', 
        url: '', 
        users: [] 
      });

      console.log('Created new news document');
    } else {
      await News.updateOne(
        { _id: newsdoc._id },
        { $set: { desc, image: newsdoc.image || '', date: newsdoc.date || new Date().toISOString(), author: newsdoc.author || '', url: newsdoc.url || '' } }
      );

      console.log('Updated existing news document');
    }

    let doc = await Comments.findOne({ email });

    if (!doc) {
      const newComment = await Comments.create({
        email,
        comments: [{ comment, newsId: newsdoc._id }],
        dates: [new Date().toISOString()]
      });

      console.log('Created new comment document');
      return NextResponse.json(newComment);
    } else {
      doc.comments.unshift({ comment, newsId: newsdoc._id });
      doc.dates.unshift(new Date().toISOString());

      const updatedComment = await doc.save();

      console.log('Updated comment document');
      return NextResponse.json(updatedComment);
    }
  } catch (error) {
    console.error('Error saving comment and news:', error);
    return NextResponse.json({ message: 'Failed to save comment and news' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}
