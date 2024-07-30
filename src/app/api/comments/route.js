import { Comments } from "@/app/models/Comment.modal";
import mongoose from "mongoose"

export async function GET(req){
    mongoose.connect(process.env.mongoURL);
    let data=await Comments.find()
    console.log(data)
    return Response.json({"Comments":data})

}