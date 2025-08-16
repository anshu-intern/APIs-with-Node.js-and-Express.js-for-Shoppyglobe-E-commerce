import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    "id" : { type : Number, required : true, unique: true},
    "userName" : { type : String, required : true, unique: true},
    "password" : { type : String, required : true}
},{ timestamps: true });

const userModel = mongoose.model("user",userSchema);

export default userModel;