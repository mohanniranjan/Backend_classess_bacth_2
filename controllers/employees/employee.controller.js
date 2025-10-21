const employees = require("../../models/employees/employee.model");

const getAll = async (req, res) => {
  if (employees.length > 0) {
    res.json({
      status: 200,
      message: "data retirved successfully",
      data: employees,
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
  //   const { id } = req.params;
  const { id } = req.query;
  const emp = employees.find((emp) => {
    if (emp.id == id) {
      return emp;
    }
  });
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
  const { name, age } = req.body;

  if (name && age) {
    const id = employees.length + 1;
    const empData = [...employees, { id: id, name: name, age: age }];

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
  const { id } = req.params;
  const { age } = req.body;

  const empData = employees.map((emp) => {
    if (emp.id == id) {
      return { ...emp, age: age };
    } else {
      return emp;
    }
  });
  if (empData.length > 0) {
    res.json({
      message: "empl updated successfully",
      data: empData,
    });
  }
};


const empDelete=async (req,res)=>{
    const {id}=req.params
    const empData=employees.filter((emp)=>{
        if(emp.id!=id){
            return emp
        }
    })
    res.json({
        message:"employee deleted successfully",
        data:empData
    })
    

}

module.exports = { getAll, getById, create, update ,empDelete};
