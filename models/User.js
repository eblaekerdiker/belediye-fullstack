import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose.Schema({
    ad: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);