const express = require("express");
const empRouter = require("./routes/employees/employee.routes");
const app = express();


app.use(express.json())

app.use("/v1/employees",empRouter)
app.listen(3500, () => {
  console.log("server is running at http://localhost:3500");
});
