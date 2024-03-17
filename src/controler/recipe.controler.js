import model from "../model/recipe.model.js";
import cloudinary from "../helper/cloudinary.js";
import recipeModel from "../model/recipe.model.js";

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

  // createRecipe: async function (req, res) {
  //   try {
  //     const { name_food, ingrediens, video } = req.body;
  //     const picture = await cloudinary.uploader.upload(req.file.path);
  //     const imageUrl = picture.url;
  //     console.log(picture);
  //     const result = await model.postRecipe(
  //       name_food,
  //       imageUrl,
  //       ingrediens,
  //       video,

  //     );
  //     fetch("https://api.onesignal.com/notifications", {
  //       method: "POST",
  //       headers: {
  //         accept: "application/json",
  //         Authorization:
  //           "Basic NmIyMjE2MzgtYTFmYS00ZThjLTgwZjQtNTY2NmYwMGQ5Yzcy",
  //         "content-type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         app_id: "21555224-a28e-48c2-8704-32908794c768",
  //         included_segments: ["Total Subscriptions"],
  //         contents: { en: "there is a new recipe" },
  //         headings: { en: "New Recipe" },
  //       }),
  //     });
  //     res.status(201).json({
  //       message: "Create recipe success",
  //       data: result,
  //     });
  //   } catch (err) {
  //     console.error("Create recipe failed", err);
  //     res.status(500).json({
  //       message: "Internal Server Error",
  //     });
  //   }
  // },

  createRecipe: async function (req, res) {
    try {
      const users_id = req.headers["user-id"];
      const { name_food, ingrediens, video } = req.body;
      const picture = await cloudinary.uploader.upload(req.file.path);
      const imageUrl = picture.url;
      console.log(picture);
      const result = await model.postRecipe(
        users_id,
        name_food,
        imageUrl,
        ingrediens,
        video
      );

      fetch("https://api.onesignal.com/notifications", {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization:
            "Basic NmIyMjE2MzgtYTFmYS00ZThjLTgwZjQtNTY2NmYwMGQ5Yzcy",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          app_id: "21555224-a28e-48c2-8704-32908794c768",
          included_segments: ["Total Subscriptions"],
          contents: { en: "there is a new recipe" },
          headings: { en: "New Recipe" },
        }),
      });

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

  // updateRecipe: async function (req, res) {
  //   try {
  //     const { recipe_id } = req.params;
  //     const { name_food, ingrediens, video } = req.body;
  //     const picture = await cloudinary.uploader.upload(req.file.path);
  //     const imageUrl = picture.url;
  //     console.log(picture);
  //     const result = await model.updateRecipes(
  //       recipe_id,
  //       name_food,
  //       imageUrl,
  //       ingrediens,
  //       video
  //     );
  //     if (result) {
  //       res.status(200).json({
  //         message: "Update recipe success",
  //         data: result,
  //       });
  //     } else {
  //       res.status(404).json({
  //         message: "Recipe not found",
  //       });
  //     }
  //   } catch (err) {
  //     console.error("Update recipe failed", err);
  //     res.status(500).json({
  //       message: "Internal Server Error",
  //     });
  //   }
  // },

  updateRecipe: async function (req, res) {
    try {
      const { recipe_id } = req.params;
      const { name_food, ingrediens, video } = req.body;
      const users_id = req.headers["user-id"];
      const picture = await cloudinary.uploader.upload(req.file.path);
      const imageUrl = picture.url;
      console.log(picture);

      const result = await model.updateRecipes(
        recipe_id,
        users_id,
        name_food,
        imageUrl,
        ingrediens,
        video
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

      const allData = await model.selectPaginate();
      const totalData = Number(allData.rows[0].total);
      const result = await model.paginations(limitValue, offsetValue);

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

  getByID: async (req, res) => {
    try {
      const id = req.params.recipe_id;
      const result = await model.selectByID(id);
      res.send({
        data: result.rows,
      });
    } catch (err) {
      res.json({ message: err.message });
    }
  },

  //   getRecipeByID: async (req, res) => {
  //     try {
  //       const users_id = req.params.users_id;
  //       const result = await recipeModel.getRecipetByID(users_id);
  //       res.send({
  //         data: result,
  //       });
  //     } catch (err) {
  //       res.json({ message: err.message });
  //     }
  //   },
  // };

  getRecipeByID: async (req, res) => {
    try {
      const users_id = req.params.users_id;
      const result = await recipeModel.getRecipetByID(users_id);
      if (result.rows.length > 0) {
        res.send({
          data: result.rows,
        });
      } else {
        res.status(404).json({ message: "Data not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default recipeController;
