import recipeModel from "../model/recipe.model.js";
import model from "../model/recipe.model.js";
import cloudinary from "../helper/cloudinary.js";

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
      const { name_food, ingrediens, video, comment } = req.body;
      const picture = await cloudinary.uploader.upload(req.file.path);
      const imageUrl = picture.url;
      console.log(picture);
      const result = await model.postRecipe(
        name_food,
        imageUrl,
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
      const { name_food, ingrediens, video, comment } = req.body;
      const picture = await cloudinary.uploader.upload(req.file.path);
      const imageUrl = picture.url;
      console.log(picture);
      const result = await model.updateRecipes(
        recipe_id,
        name_food,
        imageUrl,
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

  pagination: async (req, res) => {
    try {
      const { limit, page } = req.query;
      const pageValue = page ? Number(page) : 1;
      const limitValue = limit ? Number(limit) : 2;
      const offsetValue = pageValue === 1 ? 0 : (pageValue - 1) * limitValue;

      // Total data
      const allData = await Model.selectPaginate();
      const totalData = Number(allData.rows[0].total);

      // Data untuk halaman saat ini
      const result = await Model.paginations(limitValue, offsetValue);

      const pagination = {
        currentPage: pageValue,
        dataPerPage: limitValue,
        totalPage: Math.ceil(totalData / limitValue),
        totalData,
        result,
      };

      res.json({
        message: "OK",
        result: pagination,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default recipeController;
