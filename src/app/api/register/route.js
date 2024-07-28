// import { userModel } from "@/app/models/User";
import mongoose from "mongoose";
import { User } from "../../models/User.model";
import bcrypt from "bcrypt"

export async function POST(req) {

    const payload = await req.json();
    mongoose.connect(process.env.mongoURL);
    const pass = payload.password;
    const notHashedPassword = pass;
    const salt = bcrypt.genSaltSync(10);
    payload.password = bcrypt.hashSync(notHashedPassword, salt);
  
    const user = await User.create(payload);
    return Response.json(user);

}