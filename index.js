import express from "express";
import bodyParser from "body-parser";
import router from "./src/router/user.router.js";
import reciperouter from "./src/router/recipe.router.js";
import saverouter from "./src/router/save.router.js";
import likerouter from "./src/router/like.router.js";
import cors from "cors";

const app = express();
const port = 3004;
app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use(router);
app.use(reciperouter);
app.use(saverouter);
app.use(likerouter);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/");

// app.use((err, req, res, next) => {
//   console.error(err.stack)
//   res.status(500).send("Something broke!")
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
