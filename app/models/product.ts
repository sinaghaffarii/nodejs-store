import mongoose, { Document, Schema as MongooseSchema } from "mongoose";

interface IFeature {
  length: string;
  height: string;
  width: string;
  weight: string;
  colors: string[];
  model: string[];
  madein: string;
}

interface IProduct extends Document {
  title: string;
  short_text: string;
  text: string;
  images: string[];
  tags: string[];
  category: mongoose.Types.ObjectId;
  comments: mongoose.Types.ObjectId[];
  likes: mongoose.Types.ObjectId[];
  dislikes: mongoose.Types.ObjectId[];
  bookmarks: mongoose.Types.ObjectId[];
  price: number;
  discount: number;
  count: number;
  type: string; // virtual or physical
  format?: string;
  supplier: mongoose.Types.ObjectId;
  feature: IFeature;
  fileUploadPath: string;
}

const ProductSchema = new MongooseSchema<IProduct>({
  title: { type: String, require: true },
  short_text: { type: String, require: true },
  text: { type: String, require: true },
  images: { type: [String], require: true },
  tags: { type: [String], default: [] },
  category: { type: mongoose.Schema.Types.ObjectId, require: true },
  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Comment",
    default: [],
  },
  likes: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  dislikes: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  bookmarks: { type: [mongoose.Schema.Types.ObjectId], default: [] },
  price: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  count: { type: Number },
  type: { type: String, require: true }, //virtual or physici
  format: { type: String },
  supplier: { type: mongoose.Schema.Types.ObjectId, require: true }, // تامین کننده
  feature: {
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

ProductSchema.index({ title: "text", short_text: "text", text: "text" });

const ProductModel = mongoose.model<IProduct>("product", ProductSchema);

export type { IProduct };
export { ProductModel };
