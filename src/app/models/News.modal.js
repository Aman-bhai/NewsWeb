import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema(
  {
    title: { type: String, required: false },
    content: { type: String, required: false },
    image: { type: String, required: false },
    url: { type: String, required: false },
    desc: { type: String, required: false },
    src_name: { type: String, required: false },
    author: { type: String, required: false },
    users: [{ type: String, required: false }],
    date: { type: Date, default: Date.now, required: false }, 
  },
  { timestamps: true }
);

export const News = mongoose.models.News || mongoose.model("News", NewsSchema);
