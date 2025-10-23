const { users, address } = require("../../models/users/users.model");

const userCreate = async (req, res) => {
  const { name, city, state, country } = req.body;
  const a = await address.create({
    city: city,
    state: state,
    country: country,
  });
  const u = await users.create({ name: name, address: a._id });
  if (a && u) {
    res.json({
      message: "user created successfully",
      user: u,
      address: a,
    });
  }
};

const getAll = async (req, res) => {
  const usersData = await users.find({}).populate("address");

  if (usersData.length > 0) {
    res.json({
      status: 200,
      message: "data retirved successfully",
      data: usersData,
    });
  } else {
    res.json({
      status: 500,
      message: "data not retirved successfully",
      data: [],
    });
  }
};

module.exports = { userCreate, getAll };
