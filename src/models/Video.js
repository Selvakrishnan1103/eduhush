import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  uploadedBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  likedBy: [{ type: String }],
  dislikedBy: [{ type: String }],
  views: { type: Number, default: 0 }, 
  comments: [
    {
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      author: { type: String, required: true },
    },
  ],
});

const Video = mongoose.models.Video || mongoose.model('Video', VideoSchema);
export default Video;
