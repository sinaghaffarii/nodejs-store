import mongoose, { Document, Schema as MongooseSchema } from "mongoose";
import { ConstantConfig } from "@/utils/constants";

interface IUser extends Document {
  first_name: string;
  last_name: string;
  username: string;
  mobile: string;
  email: string;
  password: string;
  otp: {
    code: number;
    expiresIn: number;
  };
  bills: any[];
  discount: number;
  birthday: string;
  role: string;
  courses: mongoose.Types.ObjectId[];
}
const UserSchema = new MongooseSchema<IUser>(
  {
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String, lowercase: true },
    mobile: { type: String, required: true },
    email: { type: String, lowercase: true },
    password: { type: String },
    otp: {
      type: Object,
      default: {
        code: 0,
        expiresIn: 0,
      },
    },
    bills: { type: [], default: [] },
    discount: { type: Number, default: 0 },
    birthday: { type: String },
    role: { type: String, default: ConstantConfig.RULES.USER },
    courses: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "course",
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.index({ first_name: "text", last_name: "text", username: "text", mobile: "text", email: "text" });

const UserModel = mongoose.model<IUser>("user", UserSchema);

export type { IUser };
export { UserModel };
