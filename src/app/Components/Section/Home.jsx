'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function VideoList() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch('/api/videos');
        const data = await res.json();
        setVideos(data);
      } catch (err) {
        console.error("Failed to load videos", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, idx) => (
          <div
            key={idx}
            className="animate-pulse space-y-2 rounded-lg border-2 border-gray-200 p-4 bg-gray-100"
          >
            <div className="h-48 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {videos.map((video) => (
        <div
          key={video._id}
          className="cursor-pointer group "
          onClick={() => router.push(`/video/${video._id}`)}
        >
          <div className="overflow-hidden rounded-lg shadow-md border-2 border-[#3C7BAA]">
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              height="auto"
              width="auto"
            />
          </div>
          <div className="mt-2">
            <h2 className="text-lg font-semibold truncate text-[#3C7BAA]">{video.title}</h2>
            <p className="text-sm text-[#3C7BAA]">{video.uploadedBy}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
