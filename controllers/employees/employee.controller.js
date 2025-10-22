const employees = require("../../models/employees/employee.model");

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
  const empData = await employees.deleteOne({_id:id},{new:true})
  res.json({
    message: "employee deleted successfully",
    data: empData,
  });
};

module.exports = { getAll, getById, create, update, empDelete };
