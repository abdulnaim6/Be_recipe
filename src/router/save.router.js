import express from "express";
import saveController from "../controler/save.controler.js";
const router = express.Router();

router.get("/save", saveController.getAllSavedRecipes);
router.post("/save", saveController.saveRecipe);
router.delete("/save/:saved_id", saveController.unSave);

export default router;
