import Post from "@models/post";
import { connectToDB } from "@utils/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const GET = async(req, {params})=>{
    try {
        const {id} = await params;
        await connectToDB();
        const post = await Post.findById(id);
        return new Response(JSON.stringify(post), {status:200});
    } catch (error) {
        console.log("Error fetching post", error);
        return new Response("Error fetching post!", {status:500})
    }
}

export const PATCH = async(req, {params}) => {
    const {text, industry} = await req.json();
    const {id} = await params;

    try {
        await connectToDB();
        const session = await getServerSession(authOptions);

        const existingPost = await Post.findById(id);
        if(!existingPost) return new Response("Post doesn't exist!", {status:404});

        console.log("Post creator ID:", existingPost.creator.toString());
        console.log("Session user ID:", session);

        if(existingPost.creator.toString()!==session?.user.id){
            return new Response("Forbidden: You cannot edit someone else's post!", {status:403})
        }

        existingPost.text = text;
        existingPost.industry = industry;

        await existingPost.save();

        return new Response(JSON.stringify(existingPost), {status: 201})
    } catch (error) {
        console.log(error);
        return new Response('Failed to edit the post', {status:500})
    }
}

export const DELETE = async(req, {params})=>{
    const {id} = await params;
    try {
        await connectToDB();
        const session = await getServerSession(authOptions);
        const existingPost = await Post.findById(id);
        if(existingPost.creator.toString()!==session?.user.id){
            return new Response("Forbidden: You cannot delete someone else's post!", {status:403})
        }
        await Post.findByIdAndDelete(id);
        return new Response("Post deleted successfully!", {status:200})
    } catch (error) {
        console.log("Error deleting post", error);
        return new Response("Error deleting post!", {status:500})
    }
}