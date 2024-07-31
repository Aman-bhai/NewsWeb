
import mongoose from "mongoose";
import { Comments } from "@/app/models/Comment.modal";

export async function POST(req) {
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("server is connected with database")
    }).catch((err) => {
        console.log(err)
    })

    const { email, comment } = await req.json();
   
    const doc=await Comments.findOne({email})
    if(!doc){
        let date=new Date().toString()
        let data=await Comments.create({
            email,comment,date
        })

        return Response.json(data)
    }
    else{
        let id=doc._id
        doc["comment"].unshift(comment)
        doc["date"].unshift(new Date().toString())
        let data=await Comments.findByIdAndUpdate(id,doc)
        return Response.json(data)
    }

    
}  