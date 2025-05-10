'use client';

import { useRouter } from 'next/navigation';

export default function VideoCard({ video, onDelete }) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/dashboard/edit-video/${video._id}`);
  };

  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this video?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/videos/${video._id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        onDelete(video._id);
      } else {
        const errorData = await res.json();
        alert(`Failed to delete video: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("An error occurred while deleting the video.");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="w-full h-40 object-cover rounded mb-2"
      />
      <h3 className="text-lg font-semibold">{video.title}</h3>
      <p className="text-sm text-gray-600 mt-1">
        Uploaded on {new Date(video.createdAt).toLocaleDateString()}
      </p>

      <div className="flex gap-2 mt-2">
        <button onClick={handleEdit} className="text-blue-600 hover:underline">
          Edit
        </button>
        <button onClick={handleDelete} className="text-red-600 hover:underline">
          Delete
        </button>
      </div>
    </div>
  );
}
