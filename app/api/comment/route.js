import { Comment } from "@/lib/config/models/commentModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  const id = request.nextUrl.searchParams.get("id");
  const comments = await Comment.find({ assignedTo: id });
  return NextResponse.json({ success: true, comments });
}
export async function POST(request) {
  const formData = await request.formData();
  const comment = new Comment({
    name: formData.get("name"),
    assignedTo: formData.get("assignedTo"),
    comment: formData.get("comment"),
  });
  comment.save();
  return NextResponse.json({
    success: true,
    msg: "You've Commented Successfully",
  });
}
