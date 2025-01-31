import mongoose, { Document, Schema } from "mongoose";

interface IRole extends Document {
  title: string;
  permissions: mongoose.Types.ObjectId[];
}

const RoleSchema = new Schema<IRole>(
  {
    title: { type: String, unique: true },
    permissions: { type: [mongoose.Schema.Types.ObjectId], ref: "Permission", default: [] },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const RoleModel = mongoose.model<IRole>("Role", RoleSchema);

export { RoleModel };
