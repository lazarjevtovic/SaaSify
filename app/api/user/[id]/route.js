import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        const { id } = await params;

        const user = await User.findOne(
            { _id: id });

        if (!user) {
            return new Response("User not found!", { status: 404 });
        }

        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.log("Error fetching user data", error);
        return new Response("Failed to fetch user data!", { status: 500 });
    }
};
