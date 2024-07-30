
import mongoose from "mongoose";
import { Contact } from "../../models/Contact.modal";

export async function POST(req) {
    mongoose.connect(process.env.mongoURL).then(() => {
        console.log("server is connected with database")
    }).catch((err) => {
        console.log(err)
    })

    const { name, email, message } = await req.json();
   
    const doc=await Contact.findOne({email})
    
    if(!doc){
        let date=new Date().toString()
        let data=await Contact.create({
            name,email,message,date
        })

        return Response.json(data)
    }
    else{
        let id=doc._id
        doc["name"].unshift(name)
        doc["message"].unshift(message)
        doc["date"].unshift(new Date().toString())
        let data=await Contact.findByIdAndUpdate(id,doc)
        return Response.json(data)
    }

    
}  