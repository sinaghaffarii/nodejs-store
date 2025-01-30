import mongoose, { Document, Schema } from "mongoose";

interface IRole extends Document {
  title: string;
  permissions: mongoose.Types.ObjectId[];
}

const RoleSchema = new Schema<IRole>(
  {
    title: { type: String, unique: true },
    permissions: { type: [mongoose.Schema.Types.ObjectId], ref: "permissions", default: [] },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const RoleModel = mongoose.model<IRole>("role", RoleSchema);

export { RoleModel };
