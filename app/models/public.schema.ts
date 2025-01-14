import mongoose, { Document, Schema as MongooseSchema } from "mongoose";

interface IComment extends Document {
  user: mongoose.Types.ObjectId;
  comment: string;
  createAt: Date;
  parent?: mongoose.Types.ObjectId;
}

const CommentSchema = new MongooseSchema<IComment>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  comment: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "comment" },
});

const CommentModel = mongoose.model<IComment>("Comment", CommentSchema);

export type { IComment };
export { CommentModel, CommentSchema };
