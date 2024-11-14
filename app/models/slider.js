const { default: mongoose, mongo } = require("mongoose");

const Schema = new mongoose.Schema({
  title: { type: String },
  text: { type: String },
  image: { type: String, require: true },
  type: { type: String, default: "main" },
});

module.exports = {
  SliderModel: mongoose.model("slider", Schema),
};
