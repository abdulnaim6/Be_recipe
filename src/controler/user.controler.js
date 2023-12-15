import model from "../model/user.model.js";

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
      const {
        name,
        email_address,
        phone_number,
        create_new_password,
        verify_password,
      } = req.body;
      const result = await model.postUsers(
        name,
        email_address,
        phone_number,
        create_new_password,
        verify_password
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
      const {
        name,
        email_address,
        phone_number,
        create_new_password,
        verify_password,
      } = req.body;

      const result = await model.updateUsers(
        users_id,
        name,
        email_address,
        phone_number,
        create_new_password,
        verify_password
      );

      if (result) {
        res.status(200).json({
          message: "Update user success",
          data: result,
        });
      } else {
        res.status(404).json({
          message: "User not found",
        });
      }
    } catch (err) {
      console.error("Update user failed", err);
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
};

export default userController;
