import { connectToMongoDb } from "@/lib/mongoDb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Video from "@/models/Video";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function extractPublicId(url) {
  const match = url.match(/upload\/(?:v\d+\/)?(.+)\.\w+$/);
  return match ? match[1] : null;
}

export async function GET(req, { params }) {
  try {
    await connectToMongoDb();
    const videoId = params.id;

    const video = await Video.findById(videoId);

    if (!video) {
      return new Response("Video not found", { status: 404 });
    }

    return new Response(JSON.stringify(video), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch video:", error);
    return new Response("Failed to fetch video", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }
    const param = await params
    await connectToMongoDb();
    const video = await Video.findById(param.id);

    if (!video) {
      return new Response(JSON.stringify({ error: 'Video not found' }), { status: 404 });
    }

    if (video.uploadedBy !== session.user.name) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
    }

    const publicId = extractPublicId(video.videoUrl);
    if (publicId) {
      await cloudinary.v2.uploader.destroy(publicId, { resource_type: "video" });
    }

    await Video.findByIdAndDelete(params.id);

    return new Response(JSON.stringify({ message: 'Video deleted' }), { status: 200 });
  } catch (err) {
    console.error("Failed to delete video:", err);
    return new Response(JSON.stringify({ error: 'Failed to delete video' }), { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    await connectToMongoDb();
    const param = await params
    const video = await Video.findById(param.id);
    if (!video) {
      return new Response(JSON.stringify({ error: 'Video not found' }), { status: 404 });
    }

    if (video.uploadedBy !== session.user.name) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
    }

    const formData = await req.formData();
    const title = formData.get('title');
    const thumbnailFile = formData.get('thumbnail');

    if (title) video.title = title;

    if (thumbnailFile && typeof thumbnailFile === 'object') {

      const arrayBuffer = await thumbnailFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadRes = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: 'eduhush_thumbnails',
            resource_type: 'image',
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      video.thumbnailUrl = uploadRes.secure_url;
    }

    await video.save();
    return new Response(JSON.stringify({ message: 'Video updated', video }), { status: 200 });
  } catch (err) {
    console.error('PATCH error:', err);
    return new Response(JSON.stringify({ error: 'Failed to update video' }), { status: 500 });
  }
}