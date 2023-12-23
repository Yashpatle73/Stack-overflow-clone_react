import mongoose from "mongoose";

const userSchema= mongoose.Schema({
    name : {type : String , require: true},
    email : {type: String, require: true},
    password : {type: String, require: true},
    about : {type: String,},
    tags : {type: [String]},
    joinedOn : {type: Date, default:Date.now},


})


export default mongoose.model("User", userSchema)