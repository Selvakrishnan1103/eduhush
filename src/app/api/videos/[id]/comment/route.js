import { connectToMongoDb } from "@/lib/mongoDb";
import Video from "@/models/Video";

export async function POST(req, { params }) {
  try {
    await connectToMongoDb();
    const param = await params
    const { text , author} = await req.json();
    if (!text) return new Response("Comment text required", { status: 400 });
    const VideoId =param.id
    console.log(VideoId)
    const video = await Video.findByIdAndUpdate(
      VideoId,
      {
        $push: { comments: { text , author } },
      },
      { new: true }
    );

    return Response.json(video);
  } catch (err) {
    return new Response("Error adding comment", { status: 500 });
  }
}
