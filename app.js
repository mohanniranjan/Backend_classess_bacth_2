const express = require("express");
const empRouter = require("./routes/employees/employee.routes");
const dotenv = require("dotenv");
const dbConfig = require("./configurations/db.config");
const app = express();
dotenv.config();

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
app.listen(3500, () => {
  console.log("server is running at http://localhost:3500");
});
