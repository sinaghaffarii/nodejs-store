const { default: mongoose } = require("mongoose");
const { CommentSchema } = require("./public.schema");

const Episodes = mongoose.Schema({
  title: { type: string, required: true },
  text: { type: string, required: true },
  type: { type: string, default: "free" },
  time: { type: string, required: true },
});

const Chapter = mongoose.Schema({
  title: { type: string, required: true },
  text: { type: string, default: "" },
  episodes: { type: [Episodes], default: [] },
});

const Schema = new mongoose.Schema({
  title: { type: String, require: true },
  short_text: { type: String, require: true },
  text: { type: String, require: true },
  image: { type: String, require: true },
  tags: { type: [String], default: [] },
  category: { type: mongoose.Types.ObjectId, require: true },
  comments: { type: [CommentSchema], default: [] },
  likes: { type: [mongoose.Types.ObjectId], default: [] },
  deslikes: { type: [mongoose.Types.ObjectId], default: [] },
  bookmarks: { type: [mongoose.Types.ObjectId], default: [] },
  price: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  type: {
    type: String,
    default: "free",
    /* free - cash - special */ require: true,
  },
  time: { type: String, default: "00:00:00" },
  teacher: { type: mongoose.Types.ObjectId, ref: "user", require: true }, // تامین کننده
  chapter: { type: [Chapter], default: [] },
  students: { type: [mongoose.Types.ObjectId], default: [], ref: "user" },
});

module.exports = {
  Courses: mongoose.model("course", Schema),
};
