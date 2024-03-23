import mongoose from "mongoose";

//User data model
const userSchema = new mongoose.Schema({
    role:{
        type: String,
        default: "user"
    },
    name:{
        type:String,
        required:true,
        lowercase: true
    },
    email:{
        type: String,
        unique: true,       //email should be unique for every user
        required: [true,"Please provide your email address"],
        lowercase: true
    },
    password:{
        type:String,
        required:[true,"Please provide a password"]
    },
    profile_photo:{
        data: Buffer,
        type: String,
        image: String
    }
});

export default mongoose.model('users',userSchema);