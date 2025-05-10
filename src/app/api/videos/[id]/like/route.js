import { connectToMongoDb } from "@/lib/mongoDb";
import Video from "@/models/Video";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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

    const hasLiked = video.likedBy.includes(userId);
    const hasDisliked = video.dislikedBy.includes(userId);

    let update = {};

    if (hasLiked) {
      
      update = {
        $inc: { likes: -1 },
        $pull: { likedBy: userId },
      };
    } else {
      update = {
        $inc: { likes: 1 },
        $addToSet: { likedBy: userId },
      };

      if (hasDisliked) {
        update.$inc.dislikes = -1;
        update.$pull = { ...update.$pull, dislikedBy: userId };
      }
    }

    const updatedVideo = await Video.findByIdAndUpdate(videoId, update, {
      new: true,
    });

    return Response.json(updatedVideo);
  } catch (err) {
    console.error("Error toggling like:", err);
    return new Response("Error processing like", { status: 500 });
  }
}
