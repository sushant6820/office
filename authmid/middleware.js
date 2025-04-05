import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwt_secret = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1]; // ✅ Extract the token only

  try {
    const decoded = jwt.verify(token, jwt_secret);
    req.user = decoded; // Or decoded.userId if you stored userId only
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
