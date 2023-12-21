import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.header("token");
  console.log("Received token:", token);
  if (!token) {
    return res.status(401).json({ message: "Access failed" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.users_id = decoded.users_id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "invalid token" });
  }
};

export default verifyToken;
