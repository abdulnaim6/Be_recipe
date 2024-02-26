import saveModel from "../model/save.model.js";

const saveController = {
  getAllSavedRecipes: async (req, res) => {
    try {
      const savedRecipes = await saveModel.getSave();
      res.json(savedRecipes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  saveRecipe: async (req, res) => {
    try {
      const { users_id, recipe_id } = req.body;
      const result = await saveModel.insert(users_id, recipe_id);
      res.status(200);
      res.json({
        message: "Save recipe success",
        data: result,
      });
    } catch (err) {
      res.json({ message: err.message });
    }
  },

  unSave: async function (req, res) {
    try {
      const { saved_id } = req.params;
      const result = await saveModel.delete(saved_id);
      if (result) {
        res.status(200).json({
          message: "Delete success",
          data: result,
        });
      } else {
        res.status(404).json({
          message: "saved not found",
        });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
};

export default saveController;
