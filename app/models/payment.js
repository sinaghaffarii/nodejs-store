const { default: mongoose, mongo } = require("mongoose");

const Schema = new mongoose.Schema({});

module.exports = {
  PaymentModel: mongoose.model("payment", Schema),
};
