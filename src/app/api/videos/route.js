import { connectToMongoDb } from "@/lib/mongoDb";
import Video from "@/models/Video";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToMongoDb();
  const videos = await Video.find().sort({ createdAt: -1 });
  return NextResponse.json(videos);
}
