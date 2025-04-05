import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let mongourl = process.env.MONGOURL;

let dbconnection =async ()=>{
try {
    await mongoose.connect(mongourl);
    console.log("successfully connected to database")
} catch (error) {
    console.log("error while connecting database")
}
}

export default dbconnection