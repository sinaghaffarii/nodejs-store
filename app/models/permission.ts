import mongoose, { Document, Schema } from "mongoose";

interface IPermission extends Document {
  name: string;
  description: string;
}

const PermissionSchema = new Schema<IPermission>(
  {
    name: { type: String, unique: true },
    description: { type: String, default: "" },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const PermissionsModel = mongoose.model<IPermission>("Permission", PermissionSchema);

export { PermissionsModel };
export type { IPermission };
