import db from "../config/db.js";

const userModel = {
  getAllUsers: function () {
    try {
      return db.query("SELECT * FROM users");
    } catch (err) {
      console.log(err.message);
    }
  },

  postUsers: function (name, email_address, phone, password, verify_password) {
    try {
      return db.query(
        `INSERT INTO users (name, email_address, phone, password, verify_password)
         VALUES ($1, $2, $3, $4, $5)`,
        [name, email_address, phone, password, verify_password]
      );
    } catch (err) {
      console.log(err.message);
    }
  },

  // updateUsers: ({ users_id, name, picture }) => {
  //   return new Promise((resolve, reject) => {
  //     // eslint-disable-next-line no-undef
  //     db.query(
  //       `UPDATE users SET name='${name}', picture = '${picture}' WHERE users_id=${users_id}`,
  //       (err, res) => {
  //         if (err) {
  //           reject(err);
  //         }
  //         resolve(res);
  //       }
  //     );
  //   });
  // },

  updateUsers: ({ users_id, name, picture }) => {
    return new Promise((resolve, reject) => {
      const query = "UPDATE users SET name=$1, picture=$2 WHERE users_id=$3";
      const values = [name, picture, users_id];

      db.query(query, values, (err, result) => {
        if (err) {
          console.error("Error updating user:", err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  deleteUsers: function (users_id) {
    try {
      return db.query(`DELETE from users WHERE users_id=${users_id}`);
    } catch (err) {
      console.log(err.message);
    }
  },

  postLogin: (email_address) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE email_address = '${email_address}'`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  selectPaginate: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT COUNT (*) AS total FROM users", (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  pagination: (limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users LIMIT ${limit} OFFSET ${offset}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  selectByID: (users_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE users_id= ${users_id}`,
        (err, result) => {
          if (err) {
            reject(err);
          }
          resolve(result);
        }
      );
    });
  },
};

export default userModel;
