import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    assignedTo: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Comment =
  mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
