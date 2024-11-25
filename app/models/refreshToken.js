const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "1y" },
});

module.exports = {
  RefreshTokenModel: mongoose.model("refreshToken", Schema),
};
