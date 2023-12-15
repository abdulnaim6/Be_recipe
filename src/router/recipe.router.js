import express from "express";
import bodyParser from "body-parser";
import recipeControler from "../controler/recipe.controler.js";
const router = express.Router();
router.use(bodyParser.json());

router.get("/recipe", recipeControler.listRecipe);
router.post("/addrecipe", recipeControler.createRecipe);
router.put("/updaterecipe/:recipe_id", recipeControler.updateRecipe);
router.delete("/deleterecipe/:recipe_id", recipeControler.deleteRecipe);
router.get("/search", recipeControler.search);

export default router;
