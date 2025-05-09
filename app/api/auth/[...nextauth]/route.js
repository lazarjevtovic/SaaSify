import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user"

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({session}){
            const dbUser = await User.findOne({
                email: session.user.email
            })
            session.user.id = dbUser._id.toString();
            return session;
        },
        async signIn({profile}){
            try {
                await connectToDB();

                const userExists = await User.findOne({
                    email: profile.email
                });

                if(!userExists){
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }

                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}