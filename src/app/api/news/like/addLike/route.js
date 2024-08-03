import mongoose from 'mongoose';
import { Comments } from '../../../../models/Comment.modal';
import { News } from '../../../../models/News.modal'; 
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

    const { email, title, src_name, like } = await req.json();

    console.log('Received data: Sucess');

    const newsdoc = await News.findOne({ title, src_name });
    if (!newsdoc) {
      return NextResponse.json({ message: 'News not found' }, { status: 404 });
    }
    const newsId = newsdoc._id;

    let doc = await Comments.findOne({ email });

    if (!doc) {
      const newLike = await Comments.create({
        email,
        comments: [],
        dates: [],
        likes: like ? [newsId] : []
      });

      console.log('Created new like document');
      return NextResponse.json({ likes: newLike.likes });
    } else {
      const isLiked = doc.likes.includes(newsId.toString());

      if (like && !isLiked) {
        doc.likes.push(newsId);
      } else if (!like && isLiked) {
        doc.likes = doc.likes.filter(likeId => likeId.toString() !== newsId.toString());
      }

      const updatedLike = await doc.save();

      console.log('Updated like document');
      return NextResponse.json({ likes: updatedLike.likes });
    }
  } catch (error) {
    console.error('Error saving like:', error);
    return NextResponse.json({ message: 'Failed to save like' }, { status: 500 });
  }
}
