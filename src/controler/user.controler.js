import model from "../model/user.model.js";
import bcrypt from "bcrypt";
import generateToken from "../helper/jwt.js";
// import redis from "../config/redis.js";
import cloudinary from "../helper/cloudinary.js";

const userController = {
  listUser: async function (req, res) {
    try {
      const result = await model.getAllUsers();
      res.status(200).json({
        message: "Get All User Success",
        data: result,
      });
    } catch (err) {
      console.error("Get User Failed", err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  createUser: async function (req, res) {
    try {
      const { name, email_address, phone, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await model.postUsers(
        name,
        email_address,
        phone,
        hashedPassword,
        hashedPassword
      );

      res.status(201).json({
        message: "Create user success",
        data: result,
      });
    } catch (err) {
      console.error("Create user failed", err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  updateUser: async function (req, res) {
    try {
      const { users_id } = req.params;
      const { rowCount } = await model.selectByID(users_id);
      console.log(rowCount);
      if (!rowCount) {
        return res.json({ message: "data not found" });
      }
      const { name } = req.body;
      const picture = await cloudinary.uploader.upload(req.file.path);
      // const imageUrl = picture.url;
      console.log(picture);
      const result = await model.updateUsers({
        users_id,
        name,
        picture: picture.url,
      });
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

  deleteUser: async function (req, res) {
    try {
      const { users_id } = req.params;
      const result = await model.deleteUsers(users_id);
      if (result) {
        res.status(200).json({
          message: "Delete success",
          data: result,
        });
      } else {
        res.status(404).json({
          message: "User not found",
        });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email_address, verify_password } = req.body;
      const result = await model.postLogin(email_address);
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
      // res
      //   .status(500)
      //   .json({ error, message: "An error occurred during login" });
      console.error("Login error:", error);
      res.status(500).json({
        error: error.message,
        message: "An error occurred during login",
      });
    }
  },

  // getByID: async (req, res) => {
  //   try {
  //     const id = req.params.users_id;
  //     const result = await model.selectByID(id);
  //     res.send({
  //       data: result.rows,
  //     });
  //   } catch (err) {
  //     res.json({ message: err.message });
  //   }
  // },
  // getRedisID: async (req, res) => {
  //   try {
  //     const id = req.params.users_id;
  //     const result = await model.selectByID(id);
  //     await redis.set(`getFromRedis/${id}`, JSON.stringify(result), {
  //       EX: 180,
  //       NX: true,
  //     });
  //     res.send({
  //       fromCache: false,
  //       data: result.rows,
  //     });
  //   } catch (err) {
  //     res.json({ message: err.message });
  //   }
  // },

  pagination: async (req, res) => {
    const { limit, page } = req.query;
    const pageValue = page ? Number(page) : 1;
    const limitValue = limit ? Number(limit) : 2;
    const offsetValue = pageValue === 1 ? 0 : (pageValue - 1) * limitValue;

    // total page
    const allData = await model.selectPaginate();
    console.log(allData);
    const totalData = Number(allData.rows[0].total);

    model
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
};

export default userController;
