import mongoose from "mongoose";
import { type } from "os";

let userSchema = new mongoose.Schema({
    username : {type: String, required : true},
    email : {type : String, required : true, unique :true},
    password : {type : String, required : true}
});


const userModel = mongoose.model('User', userSchema);
export default userModel;