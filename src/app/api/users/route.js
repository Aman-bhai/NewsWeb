import { User } from "../../models/User.model";
import mongoose from "mongoose";

export async function GET(req) {
  await mongoose.connect(process.env.mongoURL);

  const users = await User.find({}).select('name email').lean();

  return new Response(JSON.stringify(users), { status: 200 });
}
