import CredentialsProvider from "next-auth/providers/credentials"

import clientPromise from "../../../utils/database"
import NextAuth from "next-auth"
import { User } from "../../../models/User.model"
import bcrypt from "bcrypt"
import mongoose from "mongoose"

import GoogleProvider from "next-auth/providers/google";

import { MongoDBAdapter } from "@auth/mongodb-adapter"

export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),

    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        username: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;
        let url = process.env.mongoURL

        mongoose.connect(url).then(() => {
          console.log("Successfully reach to Mongo")
        }).catch((err) => {
          console.log(err)
        });

        const user = await User.findOne({ email });
        console.log(user)
        const passwordResponse = user && bcrypt.compareSync(password, user.password);
        console.log(passwordResponse)
        
        if (passwordResponse) {
          return user;
        }

        return null
      }
    })
  ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }