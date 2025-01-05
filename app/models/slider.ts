import mongoose, { Document, Schema as MongooseSchema } from "mongoose";

interface ISlider extends Document {
  title: string;
  text: string;
  image: string;
  type: string;
}

const SliderSchema = new MongooseSchema<ISlider>({
  title: { type: String },
  text: { type: String },
  image: { type: String, require: true },
  type: { type: String, default: "main" },
});

const SliderModel = mongoose.model<ISlider>("slider", SliderSchema);

export type { ISlider };
export { SliderModel };
