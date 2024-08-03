import mongoose from 'mongoose';
import { Comments } from '../../models/Comment.modal';  
import { News } from '../../models/News.modal';        

export async function GET(req) {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const newsData = await News.find({}).exec();
        const newsMap = newsData.reduce((acc, news) => {
            acc[news._id.toString()] = news;
            return acc;
        }, {});

        const commentsData = await Comments.find({}).exec();
        const result = commentsData.reduce((acc, comment) => {
            const news = comment.comments.map(c => ({
                ...newsMap[c.newsId],
                userEmail: comment.email,
                userComment: c.comment,
            }));
            return acc.concat(news);
        }, []);

        return new Response(JSON.stringify({ comments: result }), {
            headers: { "Content-Type": "application/json" },
            status: 200
        });

    } catch (error) {
        console.error("Error fetching data:", error);
        return new Response(JSON.stringify({ message: "Failed to fetch data" }), {
            headers: { "Content-Type": "application/json" },
            status: 500
        });
    }
}
