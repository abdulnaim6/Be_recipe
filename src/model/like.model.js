import db from "../config/db.js";

const likeModel = {
  getLike: function () {
    try {
      return db.query("SELECT * FROM liked_recipes");
    } catch (err) {
      console.log(err.message);
    }
  },

  insert: (users_id, recipe_id) => {
    try {
      return db.query(`INSERT INTO liked_recipes (users_id, recipe_id)
      VALUES (${users_id}, ${recipe_id})`);
    } catch (err) {
      console.log(err.message);
    }
  },

  delete: function (liked_recipes_id) {
    try {
      return db.query(
        `DELETE from liked_recipes WHERE liked_recipes_id=${liked_recipes_id}`
      );
    } catch (err) {
      console.log(err.message);
    }
  },
};
export default likeModel;
