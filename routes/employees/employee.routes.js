const express = require("express");
const {
  getAll,
  getById,
  create,
  update,
  empDelete,
  empRegister,
  empLogin,
  empDashboard,
} = require("../../controllers/employees/employee.controller");
const authMidddleware = require("../../middleware/auth.middleware");

const empRouter = express.Router();

empRouter.get("/getAll", getAll);
// empRouter.get("/getById/:id",getById)
empRouter.get("/getById/:id", getById);
empRouter.post("/create", create);
// empRouter.put("/update/:id", update);
empRouter.put("/update/:age", update);
empRouter.delete("/delete/:id", empDelete);
empRouter.post("/empRegister", empRegister);
empRouter.post('/empLogin',empLogin)
empRouter.get('/empDashboard',authMidddleware,empDashboard)
module.exports = empRouter;
