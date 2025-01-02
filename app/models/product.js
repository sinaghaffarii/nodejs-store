const { default: mongoose } = require("mongoose");
const { CommentSchema } = require("./public.schema");

const Schema = new mongoose.Schema({
  title: { type: String, require: true },
  short_text: { type: String, require: true },
  text: { type: String, require: true },
  images: { type: [String], require: true },
  tags: { type: [String], default: [] },
  category: { type: mongoose.Types.ObjectId, require: true },
  comments: { type: [CommentSchema], default: [] },
  likes: { type: [mongoose.Types.ObjectId], default: [] },
  deslikes: { type: [mongoose.Types.ObjectId], default: [] },
  bookmarks: { type: [mongoose.Types.ObjectId], default: [] },
  price: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  count: { type: Number },
  type: { type: String, require: true }, //virtual or physici
  format: { type: String },
  supplier: { type: mongoose.Types.ObjectId, require: true }, // تامین کننده
  feture: {
    type: Object,
    default: {
      length: "",
      height: "",
      width: "",
      weight: "", 
      colors: [],
      model: [],
      madein: "",
    },
  },
});

module.exports = {
  ProductModel: mongoose.model("product", Schema),
};
