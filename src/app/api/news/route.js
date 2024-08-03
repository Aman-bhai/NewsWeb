import { NextResponse } from 'next/server';
import clientPromise from '../../utils/database';

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db('NewsDaily');
    const collection = db.collection('news');

    const newsData = await req.json();
    
    const existingNews = await collection.findOne({
      title: newsData.title,
      content: newsData.content,
      src_name: newsData.src_name
    });
    
    if (existingNews) {
      const updatedUsers = new Set(existingNews.users || []);
      updatedUsers.add(newsData.email);
      
      await collection.updateOne(
        { _id: existingNews._id },
        { $set: { users: Array.from(updatedUsers) } }
      );
      
      return NextResponse.json({ message: 'News updated successfully' }, { status: 200 });
    } else {
      await collection.insertOne({
        title: newsData.title,content: newsData.content,image: newsData.image,url: newsData.url,desc: newsData.desc,src_name: newsData.src_name,author: newsData.author,users: [newsData.email]
      });
      
      return NextResponse.json({ message: 'News added successfully' }, { status: 200 });
    }
  } catch (error) {
    console.error('Error saving news:', error);
    return NextResponse.json({ message: 'Failed to save news' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}
