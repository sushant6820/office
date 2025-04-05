import express from "express";
const userRouter = express.Router();

import { loginUser, registerUser } from "../controller/usercontroller.js";
import authMiddleware from "../authmid/middleware.js";

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get("/dashboard", authMiddleware, (req, res)=>{
    res.json({message : `welcome user ${req.user}, this is your dashboard`})
})

export default userRouter