import express from "express";
import bodyParser from "body-parser";
import recipeControler from "../controler/recipe.controler.js";
import upload from "../middleware/upload.middleware.js";
// import hitbyID from "../middleware/hitbyredis.js";
const router = express.Router();
router.use(bodyParser.json());

router.get("/recipe", recipeControler.listRecipe);
router.post("/addrecipe", upload, recipeControler.createRecipe);
router.put("/updaterecipe/:recipe_id", upload, recipeControler.updateRecipe);
router.delete("/deleterecipe/:recipe_id", recipeControler.deleteRecipe);
router.get("/search", recipeControler.search);
router.get("/paginate", recipeControler.pagination);
router.get("/recipe/:recipe_id", recipeControler.getByID);
router.get("/user/:users_id", recipeControler.getRecipeByID);
export default router;
