import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

const News = mongoose.models.News || mongoose.model("News", NewsSchema);
export default News;
