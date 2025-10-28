import { ConnectDB } from "@/lib/config/db";
import { NextResponse } from "next/server";
import { Blog } from "@/lib/config/models/blogModel";
import { writeFile } from "fs/promises";
import fs from "fs";
import "dotenv/config";
import { Comment } from "@/lib/config/models/commentModel";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

// connect to the database
await ConnectDB();

// 🔧 Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

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
  const image = formData.get("image");

  // saves image to file system
  // const imageByteData = await image.arrayBuffer();
  // const buffer = Buffer.from(imageByteData);
  // const path = `./public/${timestamp}_${image.name}`;
  // const imgUrl = `/${timestamp}_${image.name}`;

  // Convert image to buffer
  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Upload via Cloudinary stream
  const uploadResult = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "blog_pics" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    Readable.from(buffer).pipe(stream);
  });

  const blog = new Blog({
    title,
    description,
    author,
    authorImg,
    category,
    image: uploadResult.secure_url,
    imageId: uploadResult.public_id,
  });

  await blog.save();

  return NextResponse.json({ success: true, msg: "Blog Added Successfully" });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  const blog = await Blog.findById(id);
  await Comment.deleteMany({ assignedTo: id });
  fs.unlink(`./public/${blog.image}`, (err) => {});
  // await cloudinary.uploader.destroy(blog.imageId);
  await Blog.findByIdAndDelete(id);
  return NextResponse.json({ success: true, msg: "Blog Deleted Successfully" });
}
