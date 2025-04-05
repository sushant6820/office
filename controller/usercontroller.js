import userModel from "../model/usermodel.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

let jwt_secret = process.env.JWT_SECRET;

export let registerUser =async (req, res)=>{
const {username, email, password} = req.body;

try {
    const existingUser = await userModel.findOne({email});

    if (existingUser) {
        return res.status(400).json({message : "user already exists"});

        
    }

    const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = userModel.create({
            username, 
            email,
            password: hashedPassword,
        });

        res.status(200).json({message : "user registered successfully"})
} catch (error) {
    res.status(500).json({message : "something went wrong", err : error.message})
}
};


export let loginUser =async (req, res)=>{
const {email, password} = req.body;

try {
    const user = await userModel.findOne({email});

    if (!user)
        return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch)
        return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({userId : user._id}, jwt_secret)

    res.status(200).json({token, user : {id: user._id, username : user.username, email : user.email}})
} catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: err.message })
}
}
