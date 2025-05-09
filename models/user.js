import {Schema, models, model} from 'mongoose'

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: [true, 'Email already exists!']
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
            , 'Username is invalid, it should contain 8-20 alphanumerics and be unique!']
    },
    image: {
        type: String
    }
})

const User = models.User || model("User", UserSchema);

export default User;