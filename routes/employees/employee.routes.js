const express = require("express");
const {
  getAll,
  getById,
  create,
  update,
  empDelete,
} = require("../../controllers/employees/employee.controller");

const empRouter = express.Router();

empRouter.get("/getAll", getAll);
// empRouter.get("/getById/:id",getById)
empRouter.get("/getById", getById);
empRouter.post("/create", create);
empRouter.put("/update/:id", update);
empRouter.delete("/delete/:id", empDelete);
module.exports = empRouter;
