import db from "../config/db.js";

const saveModel = {
  getSave: function () {
    try {
      return db.query("SELECT * FROM saved_recipes");
    } catch (err) {
      console.log(err.message);
    }
  },

  insert: (users_id, recipe_id) => {
    try {
      return db.query(`INSERT INTO saved_recipes (users_id, recipe_id)
      VALUES (${users_id}, ${recipe_id})`);
    } catch (err) {
      console.log(err.message);
    }
  },

  delete: function (saved_id) {
    try {
      return db.query(`DELETE from saved_recipes WHERE saved_id=${saved_id}`);
    } catch (err) {
      console.log(err.message);
    }
  },
};
export default saveModel;
