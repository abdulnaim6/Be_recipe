import express from "express";
const router = express.Router();
import {
  list,
  insert,
  updateProfile,
  login,
  destroy,
  getByRedisID,
  getByID,
  pagination,
} from "../controler/user.controler";
// import { isAdmin, isCustomers } from "../midleware/auth";
import { hitbyID } from "../midleware/hitbyredis";
// import auth from "../midleware/stacAuth";
import upload from "../midleware/upload";

router
  .get("/getFromRedis/:id", hitbyID, getByRedisID)
  .get("/users/:id", getByID)
  .get("/paginate", pagination)
  // .get("/users", auth, isAdmin, list)
  .get("/users", list)
  .post("/adddata", insert)
  // .patch("/updatedata/:id", hitbyID, upload, update)
  .put("/updatedata/:id", upload, updateProfile)
  .post("/login", login)
  .delete("/deletedata/:id", destroy);

export default router;
