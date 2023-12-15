import model from "../model/recipe.model.js";

const recipeController = {
  listRecipe: async function (req, res) {
    try {
      const { query } = req;
      const order = query.order || "ASC"; // Default order is ASC
      const result = await model.getAllRecipe(order);
      res.status(200).json({
        message: "Get All Recipe Success",
        data: result,
      });
    } catch (err) {
      console.error("Get Recipe Failed", err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  createRecipe: async function (req, res) {
    try {
      const { name_food, picture, ingrediens, video, comment } = req.body;
      const result = await model.postRecipe(
        name_food,
        picture,
        ingrediens,
        video,
        comment
      );
      res.status(201).json({
        message: "Create recipe success",
        data: result,
      });
    } catch (err) {
      console.error("Create recipe failed", err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  updateRecipe: async function (req, res) {
    try {
      const { recipe_id } = req.params;
      const { name_food, picture, ingrediens, video, comment } = req.body;

      const result = await model.updateRecipes(
        recipe_id,
        name_food,
        picture,
        ingrediens,
        video,
        comment
      );

      if (result) {
        res.status(200).json({
          message: "Update recipe success",
          data: result,
        });
      } else {
        res.status(404).json({
          message: "Recipe not found",
        });
      }
    } catch (err) {
      console.error("Update recipe failed", err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  deleteRecipe: async function (req, res) {
    try {
      const { recipe_id } = req.params;
      const result = await model.deleteRecipes(recipe_id);
      if (result) {
        res.status(200).json({
          message: "Delete success",
          data: result,
        });
      } else {
        res.status(404).json({
          message: "Recipe not found",
        });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  search: (req, res) => {
    const { keyword, sort } = req.query;
    model
      .searchByName(keyword, sort)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json({ message: err.message });
      });
  },
};

export default recipeController;
