import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const tokenData = process.env.JWT_SECRET;

const generateToken = async (payload) => {
  const token = await jwt.sign(payload, tokenData, {
    expiresIn: "1h",
  });
  console.log(token);
  return token;
};

export default generateToken;
