const jwt = require("jsonwebtoken");
// const authMidddleware = async (req, res, next) => {
//   const empData = await req.cookies.employee;
//   if (empData) {
//     req.empData = empData;
//     next();
//   } else {
//     res.json({
//       message: "cookie experied",
//     });
//   }
// };




const authMidddleware = async (req, res, next) => {
    const authToken=req.headers["authorization"]
    const token=authToken.split(" ")[1]
    console.log(token)
    const empData=await jwt.verify(token,process.env.SCRET_KEY)

  
  if (empData) {
    req.empData=empData
    next()

  } else {
    res.json({
      message: "token experied",
    });
  }
};

module.exports = authMidddleware;
