import express from "express";
import userControler from "../controler/user.controler.js";
import verifyToken from "../middleware/auth.middleware.js";
const router = express.Router();

router.get("/tes", verifyToken, userControler.listUser);
router.get("/user", userControler.listUser);
router.post("/login", userControler.loginUser);
router.post("/adduser", userControler.createUser);
router.put("/updateuser/:users_id", userControler.updateUser);
router.delete("/deleteuser/:users_id", userControler.deleteUser);
router.get("/redis/:users_id", userControler.getByID);
router.get("/paginate", userControler.pagination);

export default router;
