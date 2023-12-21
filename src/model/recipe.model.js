import db from "../config/db.js";

const recipeModel = {
  getAllRecipe: function (order = "ASC") {
    try {
      // Validate the order parameter to prevent SQL injection
      const validOrders = ["ASC", "DESC"];
      const safeOrder = validOrders.includes(order.toUpperCase())
        ? order.toUpperCase()
        : "ASC";

      return db.query(
        `SELECT * FROM detail_recipe ORDER BY recipe_id ${safeOrder}`
      );
    } catch (err) {
      console.log(err.message);
    }
  },

  postRecipe: function (name_food, picture, ingrediens, video, comment) {
    try {
      return db.query(
        `INSERT INTO detail_recipe (name_food, picture, ingrediens, video, comment)
         VALUES ('${name_food}', '${picture}', '${ingrediens}', '${video}', '${comment}')`
      );
    } catch (err) {
      console.log(err.message);
    }
  },

  updateRecipes: function (
    recipe_id,
    name_food,
    picture,
    ingrediens,
    video,
    comment
  ) {
    try {
      return db.query(
        `UPDATE detail_recipe SET 
        name_food='${name_food}', 
        picture='${picture}', 
        ingrediens='${ingrediens}', 
        video='${video}', 
        comment='${comment}' 
        WHERE recipe_id=${recipe_id}`
      );
    } catch (err) {
      console.log(err.message);
    }
  },

  deleteRecipes: function (recipe_id) {
    try {
      return db.query(`DELETE from detail_recipe WHERE recipe_id=${recipe_id}`);
    } catch (err) {
      console.log(err.message);
    }
  },

  searchByName: (keyword, sort) => {
    return new Promise((resolve, reject) => {
      let query = `SELECT * FROM detail_recipe WHERE name_food LIKE '%${keyword}%'`;
      if (sort) {
        if (sort === "ASC") {
          query += " ORDER BY name_food ASC";
        } else if (sort === "DESC") {
          query += " ORDER BY name_food DESC";
        }
      }
      db.query(query, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  selectPaginate: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT COUNT (*) AS total FROM detail_recipe", (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  paginations: (limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM detail_recipe LIMIT $1 OFFSET $2",
        [limit, offset],
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
};

export default recipeModel;
