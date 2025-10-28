import { NextResponse } from "next/server";

export const Response = (success, msg) => {
  return NextResponse.json({ success: success, msg: msg });
};
