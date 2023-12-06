import { generateToken } from "../helper/jwt";
import bcrypt from "bcrypt";
import userModel from "../model/user.model.js";
// import redis from "../config/redis";
import cloudinary from "../helper/claudinary.js";

const userController = {
  list: (req, res) => {
    userModel
      .selectAll()
      .then((result) => {
        res.json({ message: result });
      })
      .catch((err) => {
        res.json({ message: err.message });
      });
  },

  pagination: async (req, res) => {
    const { limit, page } = req.query;
    const pageValue = page ? Number(page) : 1;
    const limitValue = limit ? Number(limit) : 2;
    const offsetValue = pageValue === 1 ? 0 : (pageValue - 1) * limitValue;

    // total page
    const allData = await userModel.selectPaginate();
    console.log(allData);
    const totalData = Number(allData.rows[0].total);

    userModel
      .pagination(limitValue, offsetValue)
      .then((result) => {
        console.log(result);
        const pagination = {
          currentPage: pageValue,
          dataperPage: limitValue,
          totalPage: Math.ceil(totalData / limitValue),
          totalData,
          result,
        };
        res.json({
          message: "OK",
          result: pagination,
        });
      })
      .catch((err) => {
        res.json({ message: err.message });
      });
  },

  getByID: (req, res) => {
    const id = req.params.id;
    userModel
      .selectByID(id)
      .then((result) => {
        res.send({
          data: result.rows,
        });
      })
      .catch((err) => {
        res.json({ message: err.message });
      });
  },

  getByRedisID: (req, res) => {
    const id = req.params.id;
    userModel
      .selectByID(id)
      .then((result) => {
        const dataRedis = redis.set(
          `getFromRedis/${id}`,
          JSON.stringify(result),
          {
            EX: 180,
            NX: true,
          }
        );
        res.send({
          fromCache: false,
          data: dataRedis,
        });
      })
      .catch((err) => {
        res.json({ message: err.message });
      });
  },

  insert: async (req, res) => {
    try {
      const {
        id,
        name,
        email_address,
        phone_number,
        create_new_password,
        verify_password,
        level,
      } = req.body;
      if (create_new_password !== verify_password)
        return res
          .status(401)
          .json({ message: "password and verfy password do not match" });
      bcrypt.hash(create_new_password, 10, function (err, hash) {
        if (err) {
          res.json({ message: "Error hash password", err: err.message });
        } else {
          const data = {
            id,
            name,
            email_address,
            phone_number,
            create_new_password: hash,
            verify_password: hash,
            level,
          };
          console.log(data);
          userModel
            .insertData(data)
            .then((result) => {
              res.json({
                data: result,
                message: "data succes",
              });
            })
            .catch((err) => {
              res.json({ message: err });
            });
        }
      });
    } catch (err) {
      res.json({ message: err });
    }
  },

  login: async (req, res) => {
    try {
      const { email_address, verify_password } = req.body;
      const result = await userModel.loginUser(email_address);
      console.log(result.rows);
      if (result.rowCount > 0) {
        const verify_passwordHash = result.rows[0].verify_password;
        const PasswordValid = await bcrypt.compare(
          verify_password,
          verify_passwordHash
        );
        const user = result.rows[0];
        if (PasswordValid) {
          const token = await generateToken({
            users: user,
          });
          return res.status(200).json({
            message: "Login successful",
            token: token,
            data: user,
          });
        } else {
          res.status(400).json({ message: "Invalid password " });
        }
      } else {
        res.status(400).json({ message: "Invalid email " });
      }
    } catch (error) {
      res
        .status(400)
        .json({ error, message: "An error occurred during login" });
    }
  },

  updateProfile: async (req, res) => {
    try {
      const { name } = req.body;
      const id = req.params.id;

      const { rowCount } = await userModel.selectByID(id);
      console.log(rowCount);
      if (!rowCount) {
        return res.json({ message: "data tidak ada" });
      }
      let image = await cloudinary.uploader.upload(req.file.path);
      const data = { id, name, image: image.url };
      console.log(data);
      await userModel
        .updateProfile(data)
        .then((result) => {
          res.json({
            data: result,
            message: "data berhasil ditambahkan",
          });
        })
        .catch((err) => {
          res.json({
            message: err.message,
          });
        });
    } catch (err) {
      res.json({
        message: err.message,
      });
    }
  },

  destroy: (req, res) => {
    const id = req.params.id;
    userModel
      .destroyData(id)
      .then((result) => {
        res.json({
          Data: result,
          message: "Data Delete",
        });
      })
      .catch((err) => {
        res.json({
          message: err.message,
        });
      });
  },
};

export default userController;
