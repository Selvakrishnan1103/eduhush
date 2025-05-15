'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FaThumbsUp, FaThumbsDown, FaShareAlt } from 'react-icons/fa';

export default function VideoDetails() {
  const { data: session } = useSession();
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false); // state for like
  const [disliked, setDisliked] = useState(false); // state for dislike

  useEffect(() => {
    if (id) {
      trackView();
      fetchVideo();
    }
  }, [id]);

  const trackView = async () => {
    await fetch(`/api/videos/${id}/view`, { method: 'PATCH' });
  };

  const fetchVideo = async () => {
    const res = await fetch(`/api/videos/${id}`);
    const data = await res.json();
    setVideo(data);
    setComments(data.comments || []);
    setLoading(false);
  };

  const handleLike = async () => {
    await fetch(`/api/videos/${id}/like`, { method: 'PATCH' });
    setLiked(true);
    setDisliked(false); // Optionally, unselect dislike when like is clicked
    fetchVideo();
  };

  const handleDislike = async () => {
    await fetch(`/api/videos/${id}/dislike`, { method: 'PATCH' });
    setDisliked(true);
    setLiked(false);
    fetchVideo();
  };

  const handleComment = async () => {
    if (!comment.trim()) return;
    await fetch(`/api/videos/${id}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: comment,
        author: session?.user?.name || 'Anonymous',
      }),
    });
    setComment('');
    fetchVideo();
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md animate-pulse space-y-6">
        <div className="h-8 bg-gray-300 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="w-full h-[250px] bg-gray-300 rounded-lg" />
        <div className="flex gap-3 flex-wrap">
          <div className="h-10 w-24 bg-gray-300 rounded" />
          <div className="h-10 w-28 bg-gray-300 rounded" />
          <div className="h-10 w-24 bg-gray-300 rounded" />
        </div>
        <div className="h-6 bg-gray-300 rounded w-1/3" />
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-1 text-[#3C7BAA]">{video.title}</h1>
      <p className="text-sm text-gray-600 mb-4">
        👁️ {video.views || 0} views • Uploaded on {new Date(video.createdAt).toLocaleDateString()}
      </p>

      <div className="w-full h-[200px] lg:h-[400px] bg-black rounded-lg overflow-hidden mb-4">
        <video
          src={video.videoUrl}
          controls
          className="w-full h-full object-contain bg-black"
          poster={video.thumbnailUrl}
        />
      </div>

      <div className="flex items-center gap-4 mb-6 flex-wrap text-xl">
        <div className='flex justify-center items-center rounded-full border-2 border-[#3C7BAA] p-1'>
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 transition text-sm ${
              liked ? 'text-[#1b3f5e]' : 'text-[#3C7BAA] hover:text-[#2d5d89]'
            }`}
          >
            <span>{video.likes || 0}</span>likes
            <FaThumbsUp />
            
          </button>
        </div>

        <div className='flex justify-center items-center rounded-full border-2 border-[#5b0d0d] p-1'>
          <button
            onClick={handleDislike}
            className={`flex items-center gap-1 transition text-sm ${
              disliked ? 'text-[#5b0d0d]' : 'text-red-600 hover:text-red-700'
            }`}
          >
            <span>{video.dislikes || 0}</span>dislikes
            <FaThumbsDown />
          </button>
        </div>

        <div className='flex justify-center items-center rounded-full border-2 border-[#5b0d0d] p-1'>
          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="flex items-center gap-1 text-[#3C7BAA] text-sm hover:text-[#2d5d89] transition"
          >
            <FaShareAlt /><span>Share</span>
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-[#3C7BAA]">Comments</h2>
        <textarea
          className="w-full border border-gray-300 p-3 rounded-lg mb-3 bg-white text-gray-800"
          placeholder="Write a comment..."
          rows="3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          onClick={handleComment}
          className="bg-[#3C7BAA] hover:bg-[#2d5d89] text-white px-4 py-2 rounded transition"
        >
          Add Comment
        </button>
      </div>

      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((cmt, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-lg p-4 bg-white"
            >
              <p className="text-gray-800">{cmt.text}</p>
              <p className="text-sm text-gray-500 mt-1">
                by {cmt.author || 'Anonymous'} •{' '}
                {new Date(cmt.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
}
