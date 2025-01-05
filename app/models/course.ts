import mongoose, { Document, Schema as MongooseSchema } from "mongoose";
import { CommentModel } from "./public.schema";

interface IEpisode extends Document {
  title: string;
  text: string;
  type: string;
  time: string;
}

interface IChapter extends Document {
  title: string;
  text: string;
  episodes: IEpisode[];
}

interface ICourse extends Document {
  title: string;
  short_text: string;
  text: string;
  image: string;
  tags: string[];
  category: mongoose.Types.ObjectId;
  comments: (typeof CommentModel)[];
  likes: mongoose.Types.ObjectId[];
  dislikes: mongoose.Types.ObjectId[];
  bookmarks: mongoose.Types.ObjectId[];
  price: number;
  discount: number;
  type: string;
  time: string;
  teacher: mongoose.Types.ObjectId;
  chapter: IChapter[];
  students: mongoose.Types.ObjectId[];
}

const EpisodeSchema = new MongooseSchema<IEpisode>({
  title: { type: String, required: true },
  text: { type: String, required: true },
  type: { type: String, default: "free" },
  time: { type: String, required: true },
});

const ChapterSchema = new MongooseSchema<IChapter>({
  title: { type: String, required: true },
  text: { type: String, default: "" },
  episodes: { type: [EpisodeSchema], default: [] },
});

const CourseSchema = new MongooseSchema<ICourse>({
  title: { type: String, require: true },
  short_text: { type: String, require: true },
  text: { type: String, require: true },
  image: { type: String, require: true },
  tags: { type: [String], default: [] },
  category: { type: mongoose.Schema.Types.ObjectId, require: true },
  comments: { type: [CommentModel], default: [] },
  likes: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  dislikes: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  bookmarks: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  price: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  type: {
    type: String,
    default: "free",
    /* free - cash - special */ require: true,
  },
  time: { type: String, default: "00:00:00" },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "user", require: true }, // تامین کننده
  chapter: { type: [ChapterSchema], default: [] },
  students: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "user",
  },
});

const CategoryModel = mongoose.model<ICourse>("category", CourseSchema);

export type { ICourse };
export { CategoryModel };
