import { config } from "dotenv";
import jwt from "jsonwebtoken";

config(); // Load environment variables from .env file

const tokenData = process.env.SECRET_KEY;

const generateToken = async (payload) => {
  const token = await jwt.sign(payload, tokenData, {
    expiresIn: "1h",
  });
  console.log(token);
  return token;
};

export { generateToken };
