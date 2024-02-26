import express from "express";
import likeController from "../controler/like.controler.js";
const router = express.Router();

router.get("/like", likeController.getAllLikeRecipes);
router.post("/like", likeController.likeRecipe);
router.delete("/like/:liked_recipes_id", likeController.unLike);

export default router;
