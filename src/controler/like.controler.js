import likeModel from "../model/like.model.js";

const likeController = {
  getAllLikeRecipes: async (req, res) => {
    try {
      const likedRecipes = await likeModel.getLike();
      res.json(likedRecipes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  likeRecipe: async (req, res) => {
    try {
      const { users_id, recipe_id } = req.body;
      const result = await likeModel.insert(users_id, recipe_id);
      res.status(200);
      res.json({
        message: "Like recipe success",
        data: result,
      });
    } catch (err) {
      res.json({ message: err.message });
    }
  },

  unLike: async function (req, res) {
    try {
      const { liked_recipes_id } = req.params;
      const result = await likeModel.delete(liked_recipes_id);
      if (result) {
        res.status(200).json({
          message: "Delete success",
          data: result,
        });
      } else {
        res.status(404).json({
          message: "Like not found",
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

export default likeController;
