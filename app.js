const express = require("express");
const empRouter = require("./routes/employees/employee.routes");
const dotenv = require("dotenv");
const dbConfig = require("./configurations/db.config");
const cookieParser=require("cookie-parser");
const userRouter = require("./routes/users/users.routes");
const postRouter = require("./routes/posts/posts.routes");
const app = express();
dotenv.config();
app.use(cookieParser())

const dbConnection = async () => {
  try {
    await dbConfig();
    console.log("databse synched successfully");
  } catch (error) {
    console.log("databse not synched : ", error);
  }
};

dbConnection();
app.use(express.json());
app.use("/v1/employees", empRouter);
app.use("/v1/users",userRouter)
app.use("/v1/posts",postRouter)
app.listen(3500, () => {
  console.log("server is running at http://localhost:3500");
});
