import Post from "@models/post";
import { connectToDB } from "@utils/database";
export const GET=async(req, {params})=>{
    try {
        const {id} = await params;
        await connectToDB();
        const posts = await Post.find({
            creator: id
        }).populate('creator');
        return new Response(JSON.stringify(posts), {status:200})
    } catch (error) {
        console.log("Error fetching user's posts", error);
        return new Response("Error fetching user's posts!", {status:500})
    }
}