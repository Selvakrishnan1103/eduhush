'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function News() {
  const { data: session } = useSession();
  const [newsList, setNewsList] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isNewsLoading, setIsNewsLoading] = useState(true); // Track news loading state

  const fetchNews = async () => {
    setIsNewsLoading(true); // Set to true before fetching
    try {
      const res = await fetch('/api/news');
      if (!res.ok) throw new Error('Failed to fetch news');
      const data = await res.json();
      setNewsList(data);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setIsNewsLoading(false); // Set to false after data is fetched
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'EduHush_Post');

    setIsUploading(true);
    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dv3ggy4va/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setImageUrl(data.secure_url);
    } catch (err) {
      console.error('Image upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          image: imageUrl,
        }),
      });
      if (!res.ok) throw new Error('Failed to post news');
      setTitle('');
      setContent('');
      setImageUrl('');
      fetchNews();
    } catch (error) {
      console.error('Error posting news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    if (session?.user?.isAdmin) {
      setIsAdmin(true);
    }
  }, [session]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-[#3C7BAA]">📰 Educational News</h1>

      {isAdmin && (
        <div className="mb-6 bg-white shadow p-4 rounded-md">
          {/* Skeleton for Admin Post Form */}
          {isUploading || loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-10 bg-gray-300 rounded w-full" />
              <div className="h-24 bg-gray-300 rounded w-full" />
              <div className="h-10 bg-gray-300 rounded w-full" />
              <div className="h-8 bg-gray-300 rounded w-full" />
            </div>
          ) : (
            <>
              <input
                type="text"
                className="w-full border border-[#3C7BAA] p-2 mb-2 rounded text-[#3C7BAA]"
                placeholder="News Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                className="w-full border border-[#3C7BAA] p-2 mb-2 rounded text-[#3C7BAA]"
                rows="4"
                placeholder="News Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-[#3C7BAA] p-2 mb-2 rounded text-[#3C7BAA]"
              />
              {imageUrl && (
                <img src={imageUrl} alt="Uploaded preview" className="w-full h-auto rounded mb-2" />
              )}
              <button
                onClick={handleSubmit}
                className="mt-2 bg-[#3C7BAA] text-white px-4 py-2 rounded hover:bg-[#326b96] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!title.trim() || !content.trim() || loading || isUploading}
              >
                {loading ? 'Posting...' : isUploading ? 'Uploading Image...' : 'Post News'}
              </button>
            </>
          )}
        </div>
      )}

      <div className="space-y-4">
        {/* Skeleton for News Posts */}
        {isNewsLoading ? (
          <>
            {[...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-md shadow animate-pulse"
              >
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/4" />
              </div>
            ))}
          </>
        ) : newsList.length > 0 ? (
          newsList.map((news) => (
            <div key={news._id} className="bg-white p-4 rounded-md shadow">
              {news.image && (
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-auto rounded mb-2"
                />
              )}
              <h2 className="text-xl font-semibold text-[#3C7BAA]">{news.title}</h2>
              <p className="mt-1 text-gray-700 whitespace-pre-line">{news.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                by {news.author} • {new Date(news.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No news available yet.</p>
        )}
      </div>
    </div>
  );
}
