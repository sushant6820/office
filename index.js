import express from "express";
import dotenv from "dotenv";
import dbconnection from "./dbcon/dbcon.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();

let port = process.env.PORT;
const app = express();
app.use(express.json());

dbconnection();
app.use('/user', userRouter)


app.listen(port, ()=>{
    console.log(`server running on port number ${port}`)
})



