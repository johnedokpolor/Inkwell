import { ConnectDB } from "@/lib/config/db";
import { NextResponse } from "next/server";
import { Blog } from "@/lib/config/models/blogModel";
import { writeFile } from "fs/promises";
import fs from "fs";
import { Comment } from "@/lib/config/models/commentModel";

// connect to the database
await ConnectDB();

export async function GET(request) {
  const id = request.nextUrl.searchParams.get("id");
  if (id) {
    const blog = await Blog.findById(id);
    return NextResponse.json({ success: true, blog });
  } else {
    const blogs = await Blog.find({});
    return NextResponse.json({ success: true, blogs });
  }
}

export async function POST(request) {
  const timestamp = Date.now();
  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const category = formData.get("category");
  const author = formData.get("author");
  const authorImg = formData.get("authorImg");

  //   saves image to file system
  const image = formData.get("image");
  const imageByteData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByteData);
  const path = `./public/${timestamp}_${image.name}`;
  const imgUrl = `/${timestamp}_${image.name}`;

  const blog = new Blog({
    title,
    description,
    author,
    authorImg,
    category,
    image: imgUrl,
  });

  await blog.save();
  await writeFile(path, buffer);

  return NextResponse.json({ success: true, msg: "Blog Added Successfully" });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  const blog = await Blog.findById(id);
  await Comment.deleteMany({ assignedTo: id });
  fs.unlink(`./public/${blog.image}`, () => {});
  await Blog.findByIdAndDelete(id);
  return NextResponse.json({ success: true, msg: "Blog Deleted Successfully" });
}
