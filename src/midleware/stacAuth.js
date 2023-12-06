import { config } from "dotenv";
import jwt from "jsonwebtoken";

config();

const dataToken = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
  try {
    const { token } = req.headers;
    const decode = jwt.verify(token, dataToken);

    req.APP_DATA = {
      tokenDecode: decode,
    };
    console.log(req.APP_DATA);
    next();
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

export default authMiddleware;
