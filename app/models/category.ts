import mongoose, { Document, Schema as MongooseSchema } from "mongoose";
import { NextFunction } from "express";

interface ICategory extends Document {
  title: string;
  parent?: mongoose.Types.ObjectId;
}

const CategorySchema = new MongooseSchema<ICategory>(
  {
    title: { type: String, required: true },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      default: undefined,
    },
  },
  {
    id: false,
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
  }
);

CategorySchema.virtual("children", {
  ref: "category",
  localField: "_id",
  foreignField: "parent",
});

function autoPopulate(next: NextFunction) {
  this.populate([{ path: "children", select: { __v: 0, id: 0 } }]);
  next();
}

CategorySchema.pre("findOne", autoPopulate).pre("find", autoPopulate);

const CategoryModel = mongoose.model<ICategory>("category", CategorySchema);

export type { ICategory };
export { CategoryModel };
