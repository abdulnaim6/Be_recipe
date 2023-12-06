import { query } from "../config/db.js";

const userModel = {
  selectAll: () => {
    return new Promise((resolve, reject) => {
      query("SELECT * FROM users", (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  selectPaginate: () => {
    return new Promise((resolve, reject) => {
      query("SELECT COUNT (*) AS total FROM users", (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  pagination: (limit, offset) => {
    return new Promise((resolve, reject) => {
      query(
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

  insertData: ({
    name,
    email_address,
    phone_number,
    create_new_password,
    verify_password,
    level,
  }) => {
    return new Promise((resolve, reject) => {
      query(
        `INSERT INTO users(name, email_address, phone_number, create_new_password, verify_password, level) VALUES
          ('${name}', '${email_address}', '${phone_number}', '${create_new_password}', '${verify_password}', ${level})`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  loginUser: (email_address) => {
    return new Promise((resolve, reject) => {
      query(
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

  updateProfile: ({ id, name, image }) => {
    return new Promise((resolve, reject) => {
      query(
        `UPDATE users SET name='${name}', image = '${image}' WHERE id=${id}`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  selectByID: (id) => {
    return new Promise((resolve, reject) => {
      query(`SELECT * FROM users WHERE id = ${id}`, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  },

  destroyData: (id) => {
    return new Promise((resolve, reject) => {
      query(`DELETE FROM users  WHERE id=${id}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
};

export default userModel;
