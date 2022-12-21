import mongoose from "mongoose";

const User = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    actions:{
        type: [String]
    }
});

const user = mongoose.model("user", User);

export default user;