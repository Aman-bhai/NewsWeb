import { Comments } from "../../models/Comment.modal";
import mongoose from "mongoose"

export async function GET(req){
    mongoose.connect(process.env.MONGODB_URI);
    let data=await Comments.find()
    return Response.json({"Comments":data})

}