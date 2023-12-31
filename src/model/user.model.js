import db from "../config/db.js";

const userModel = {
  getAllUsers: function () {
    try {
      return db.query("SELECT * FROM users");
    } catch (err) {
      console.log(err.message);
    }
  },

  postUsers: function (
    name,
    email_address,
    phone_number,
    create_new_password,
    verify_password
  ) {
    try {
      return db.query(
        `INSERT INTO users (name, email_address, phone_number, create_new_password, verify_password)
         VALUES ('${name}', '${email_address}', '${phone_number}', '${create_new_password}', '${verify_password}')`
      );
    } catch (err) {
      console.log(err.message);
    }
  },

  updateUsers: function (
    users_id,
    name,
    email_address,
    phone_number,
    create_new_password,
    verify_password
  ) {
    try {
      return db.query(
        `UPDATE users SET 
        name='${name}', 
        email_address='${email_address}', 
        phone_number='${phone_number}', 
        create_new_password='${create_new_password}', 
        verify_password='${verify_password}' 
        WHERE users_id=${users_id}`
      );
    } catch (err) {
      console.log(err.message);
    }
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
