import { connectToMongoDb } from "@/lib/mongoDb";
import Video from "@/models/Video";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectToMongoDb();

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("search");

  let videos;

  if (query) {
    videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).sort({ createdAt: -1 });
  } else {
    videos = await Video.find().sort({ createdAt: -1 });
  }

  return NextResponse.json(videos);
}
