const employees = require("../../models/employees/employee.model");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const getAll = async (req, res) => {
  const empData = await employees.find({});
  if (empData.length > 0) {
    res.json({
      status: 200,
      message: "data retirved successfully",
      data: empData,
    });
  } else {
    res.json({
      status: 500,
      message: "data not retirved successfully",
      data: [],
    });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  //   const { id } = req.query;
  console.log("id :", id);
  //   const emp = await employees.findOne({ _id: id });
  const emp = await employees.findById(id);
  console.log("emp:", JSON.stringify(emp));
  if (emp) {
    res.json({
      status: 200,
      message: "employee retirved successfully",
      data: emp,
    });
  } else {
    res.json({
      status: 500,
      message: "employee not retirved successfully",
      data: {},
    });
  }
};

const create = async (req, res) => {
  //   const { name, age, email, password } = req.body;
  //   const empData = await employees.create({
  //     name: name,
  //     age: age,
  //     email: email,
  //     password: password,
  //   });

  //! insertMany()
  const data = req.body;
  const empData = await employees.insertMany(data);

  if (empData.length > 0) {
    res.json({
      message: "employee created successfully",
      data: empData,
    });
  } else {
    res.json({
      message: "employee not created successfully",
      data: [],
    });
  }
};

const update = async (req, res) => {
  //   const { id } = req.params;
  //   const { age } = req.body;
  //   const updatedEmp=await employees.updateOne({_id:id},{$set:{age:age}})
  //   const updatedEmp = await employees.findOneAndUpdate(
  //     { _id: id },
  //     { $set: { age: age } },
  //     { new: true }
  //   );
  const { age } = req.params;
  const { empAge } = req.body;
  const empdata = await employees.updateMany(
    { age: age },
    { $set: { age: empAge } }
  );

  if (empdata) {
    res.json({
      message: "empl updated successfully",
      data: empdata,
    });
  }
};

const empDelete = async (req, res) => {
  const { id } = req.params;
  const empData = await employees.deleteOne({ _id: id }, { new: true });
  res.json({
    message: "employee deleted successfully",
    data: empData,
  });
};

const empRegister = async (req, res) => {
  const { name, age, email, password } = req.body;
  const file=req.file
  const hashsedPassword = await bcrypt.hash(password, 10);
  const emp = await employees.findOne({ email: email });
  if (emp) {
    res.json({
      message: "employee already existed",
    });
  } else {
    const empData = await employees.create({
      name: name,
      age: age,
      email: email,
      password: hashsedPassword,
      image:file.filename
    });

    if (empData) {
      res.json({
        message: "employee created successfully",
        data: empData,
      });
    } else {
      res.json({
        message: "employee not created successfully",
        data: {},
      });
    }
  }
};

//!cookie based authentication
// const empLogin = async (req, res) => {
//   const { email, password } = req.body;
//   const emp = await employees.findOne({ email: email });
//   const isMatchedPassword = await bcrypt.compare(password, emp.password);
//   if (emp && isMatchedPassword) {
//     res.cookie(
//       "employee",
//       { name: emp.name, age: emp.age, email: emp.email },
//       {
//         maxAge: 1 * 24 * 60 * 60 * 1000,
//         httpOnly: true,
//         secure: false,
//       }
//     );
//     res.json({
//       message: "login successfully",
//     });
//   } else {
//     res.json({ message: "login failed" });
//   }
// };

//!token based authentication
const empLogin = async (req, res) => {
  const { email, password } = req.body;
  const emp = await employees.findOne({ email: email });
  const isMatchedPassword = await bcrypt.compare(password, emp.password);
  if (emp && isMatchedPassword) {
    const token=await jwt.sign(
      { name: emp.name, age: emp.age, email: emp.email ,image:emp.image},
      process.env.SCRET_KEY,
      {
        expiresIn:"10m"
      }
    );

    res.json({
      message: "login successfully",
      data:emp,
      token:token
    });
  } else {
    res.json({ message: "login failed" });
  }
};
const empDashboard = async (req, res) => {
  const empdata = req.empData;
  const role = "admin";
  if (role == "admin" && empdata) {
    res.json({
      message: "welcome to dashboard",
      data: empdata,
    });
  } else {
    res.json({
      message: "this is dashboard is visible for admin only",
    });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  empDelete,
  empRegister,
  empLogin,
  empDashboard,
};
