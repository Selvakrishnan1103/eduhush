import mongoose from 'mongoose';

const forumPostSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    author: { type: String, required: true },
  },
  { timestamps: true }
);

const ForumPost = mongoose.models.ForumPost || mongoose.model('ForumPost', forumPostSchema);
export default ForumPost;
