import { Subscriber } from "@/lib/config/models/subscriberModel";
import { NextResponse } from "next/server";

// Get all subscriptions
export const GET = async () => {
  const subscribers = await Subscriber.find({});

  return NextResponse.json({
    success: true,
    subscribers,
  });
};

// Subscribe a user
export const POST = async (request) => {
  const formData = await request.formData();
  const email = formData.get("email");

  const oldSubcriber = await Subscriber.findOne({ email: email });
  if (oldSubcriber) {
    return NextResponse.json({
      success: false,
      msg: "This email is already subcribed. Try another.",
      oldSubcriber,
    });
  }

  const subscriber = new Subscriber({
    email,
  });
  await subscriber.save();
  return NextResponse.json({
    success: true,
    msg: "You have subscribed successfully",
  });
};

// Delete a subscribed email
export const DELETE = async (request) => {
  const id = request.nextUrl.searchParams.get("id");
  await Subscriber.findByIdAndDelete(id);
  return NextResponse.json({
    success: true,
    msg: "Subscriber Deleted Successfully",
  });
};
