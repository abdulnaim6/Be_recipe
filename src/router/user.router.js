import express from "express";
import userControler from "../controler/user.controler.js";
const router = express.Router();

router.get("/user", userControler.listUser);
router.post("/adduser", userControler.createUser);
router.put("/updateuser/:users_id", userControler.updateUser);
router.delete("/deleteuser/:users_id", userControler.deleteUser);

export default router;
