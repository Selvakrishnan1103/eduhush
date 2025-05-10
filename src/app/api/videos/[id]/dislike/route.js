import { connectToMongoDb } from "@/lib/mongoDb";
import Video from "@/models/Video";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

export async function PATCH(req, { params }) {
  try {
    await connectToMongoDb();
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const userId = session.user.id;
    const param = await params
    const videoId = param.id;

    const video = await Video.findById(videoId);
    if (!video) {
      return new Response("Video not found", { status: 404 });
    }

    const hasDisliked = video.dislikedBy.includes(userId);
    const hasLiked = video.likedBy.includes(userId);

    let update = {};

    if (hasDisliked) {

      update = {
        $inc: { dislikes: -1 },
        $pull: { dislikedBy: userId },
      };
    } else {
      update = {
        $inc: { dislikes: 1 },
        $addToSet: { dislikedBy: userId },
      };

      if (hasLiked) {
        update.$inc.likes = -1;
        update.$pull = { ...update.$pull, likedBy: userId };
      }
    }

    const updatedVideo = await Video.findByIdAndUpdate(videoId, update, {
      new: true,
    });

    return Response.json(updatedVideo);
  } catch (err) {
    console.error("Error toggling dislike:", err);
    return new Response("Error processing dislike", { status: 500 });
  }
}
