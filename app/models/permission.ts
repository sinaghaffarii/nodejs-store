import mongoose, { Document, Schema } from "mongoose";

interface IPermission extends Document {
  title: string;
  description: string;
}

const PermissionSchema = new Schema<IPermission>(
  {
    title: { type: String, unique: true },
    description: { type: String, default: "" },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const PermissionsModel = mongoose.model<IPermission>("permission", PermissionSchema);

export { PermissionsModel };
