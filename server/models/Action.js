import mongoose from "mongoose";

const ActionSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
    },
    amount: {
        type: Number,
        required: true,
    },
},
 { timestamps: true }
);

const action =  mongoose.model("Action", ActionSchema);

export default action;