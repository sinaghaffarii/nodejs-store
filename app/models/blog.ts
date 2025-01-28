import mongoose, { Document, Schema } from "mongoose";

interface IBlog extends Document {
  author: mongoose.Types.ObjectId;
  title: string;
  short_text: string;
  text: string;
  image: string;
  tags: string[];
  category: mongoose.Types.ObjectId[];
  comments: mongoose.Types.ObjectId[];
  likes: mongoose.Types.ObjectId[];
  dislikes: mongoose.Types.ObjectId[];
  bookmarks: mongoose.Types.ObjectId[];
}

const BlogSchema = new Schema<IBlog>(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: { type: String, required: true },
    short_text: { type: String, required: true },
    text: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], default: [] },
    category: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "category",
      required: true,
    },
    comments: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Comment",
      default: [],
    },
    likes: { type: [mongoose.Schema.Types.ObjectId], ref: "user", default: [] },
    dislikes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "user",
      default: [],
    },
    bookmarks: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "user",
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
  }
);

BlogSchema.virtual("user", {
  ref: "user",
  localField: "_id",
  foreignField: "author",
});
BlogSchema.virtual("category_detail", {
  ref: "category",
  localField: "_id",
  foreignField: "category",
});

BlogSchema.virtual("imageURL").get(function () {
  return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.image}`;
});

const BlogModel = mongoose.model<IBlog>("blog", BlogSchema);

export type { IBlog };
export { BlogModel };
