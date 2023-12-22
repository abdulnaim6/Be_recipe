import client from "../config/redis.js";

const hitbyID = async (req, res, next) => {
  const idUser = req.params.users_id;
  try {
    const user = await client.get(`getFromRedis/${idUser}`);
    console.log(user);
    if (user) {
      let result = JSON.parse(user);
      res.send({
        fromCache: true,
        data: result,
      });
    } else {
      next();
    }
  } catch (err) {
    console.error(err.message);
    res.status(404);
  }
};

export default hitbyID;
