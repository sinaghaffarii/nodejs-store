import mongoose, { Document, Schema as MongooseSchema } from "mongoose";

interface IRefreshToken extends Document {
  userId: mongoose.Types.ObjectId;
  token: string;
  createdAt: Date;
}

const RefreshTokenSchema = new MongooseSchema<IRefreshToken>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "1y" },
});

const RefreshTokenModel = mongoose.model<IRefreshToken>(
  "refreshToken",
  RefreshTokenSchema
);

export type { IRefreshToken };
export { RefreshTokenModel };
