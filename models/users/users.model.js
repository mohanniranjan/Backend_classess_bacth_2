const mongoose = require("mongoose");
const addressSchema = mongoose.Schema({
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
});

const address = mongoose.model("address", addressSchema);


const userSchema = mongoose.Schema({
  name: {
    type: String,
  },
  address: { type: mongoose.Schema.Types.ObjectId, ref: "address" },
});

const users = mongoose.model("users", userSchema);

module.exports = { address, users };
