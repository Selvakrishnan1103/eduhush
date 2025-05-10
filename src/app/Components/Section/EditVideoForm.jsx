'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditVideoForm() {
  const router = useRouter();
  const params = useParams();
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(`/api/videos/${params.id}`);
        if (!res.ok) throw new Error('Failed to fetch video');
        const data = await res.json();
        setVideo(data);
        setTitle(data.title);
      } catch (err) {
        console.error(err);
      }
    };
    if (params?.id) {
      fetchVideo();
    }
  }, [params?.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }

    try {
      const res = await fetch(`/api/videos/${params.id}`, {
        method: 'PATCH',
        body: formData,
      });

      if (res.ok) {
        router.push('/dashboard');
      } else {
        alert('Failed to update video');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while updating the video.');
    }
  };

  if (!video) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-6 bg-white p-6 shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Edit Video</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">New Thumbnail (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
            className="w-full"
          />
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600">Current Thumbnail:</p>
          <img src={video.thumbnailUrl} alt="Thumbnail" className="w-full h-40 object-cover mt-1 rounded" />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Video
        </button>
      </form>
    </div>
  );
}
