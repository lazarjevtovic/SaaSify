import {Schema, model, models} from 'mongoose';

const PostSchema = new Schema({
    creator:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        required: [true, 'Text is required!']
    },
    industry: {
        type: String,
        required: [true, 'Industry is required!']
    }
})

const Post = models.Post || model("Post", PostSchema);
export default Post;