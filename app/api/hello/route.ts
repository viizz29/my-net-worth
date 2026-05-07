import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({ msg: "OK", data: "Hello World!" });
}
