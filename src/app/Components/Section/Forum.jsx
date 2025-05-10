'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Forum() {
  const { data: session } = useSession();
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPostsLoading, setIsPostsLoading] = useState(true); // Track post loading state

  const fetchPosts = async () => {
    setIsPostsLoading(true); // Set to true before fetching
    const res = await fetch('/api/forum');
    const data = await res.json();
    setPosts(data);
    setIsPostsLoading(false); // Set to false after data is fetched
  };
  
  const handleSubmit = async () => {
    if (!content.trim()) return;
    setLoading(true);

    await fetch('/api/forum', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, author: session?.user?.name }),
    });

    setContent('');
    setLoading(false);
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">📣 Public Forum</h1>

      {session && (
        <div className="mb-8">
          <textarea
            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none text-gray-700"
            rows="4"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="mt-2 text-right">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-all"
            >
              {loading ? 'Posting...' : 'Post Message'}
            </button>
          </div>
        </div>
      )}

      {/* Loading Skeleton for Posts */}
      <div className="space-y-4">
        {isPostsLoading ? (
          <>
            {/* Skeleton for Posts */}
            {[...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className="p-4 border border-gray-200 rounded-md shadow-sm bg-gray-50 animate-pulse"
              >
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </>
        ) : posts.length === 0 ? (
          <p className="text-gray-500 italic">No posts yet. Be the first to start the conversation!</p>
        ) : (
          posts
            .slice()
            .reverse()
            .map((post) => (
              <div
                key={post._id}
                className="p-4 border border-gray-200 rounded-md shadow-sm bg-gray-50 hover:bg-gray-100 transition"
              >
                <p className="text-gray-800 text-lg mb-1">{post.content}</p>
                <p className="text-sm text-gray-500">
                  by <span className="font-medium">{post.author}</span> •{' '}
                  {new Date(post.createdAt).toLocaleString()}
                </p>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
