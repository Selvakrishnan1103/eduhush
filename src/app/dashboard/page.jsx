'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import ProfileCard from './components/ProfileCard';
import VideoCard from './components/VideoCard';
import Header from '../Components/Section/Header';
import Footer from '../Components/Section/Footer';
import { FiVideo, FiEye } from 'react-icons/fi'; 
import StatsCard from './components/StatsCard';

export default function DashboardPage() {
  const { data: session } = useSession();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchUserVideos = async () => {
      const res = await fetch('/api/videos/me');
      const data = await res.json();
      setVideos(data.videos);
    };
    fetchUserVideos();
  }, []);

  const handleDelete = (deletedId) => {
    setVideos(prev => prev.filter(video => video._id !== deletedId));
  };

  if (!session) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-xl font-semibold text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="max-w-5xl mx-auto p-6 mt-22 mb-22">
        <h1 className="text-3xl font-bold text-[#3C7BAA] mb-6">Welcome, {session.user.name} 👋</h1>
        <ProfileCard user={session.user} />
        <h2 className="text-2xl mt-8 mb-4 text-[#3C7BAA]">📊 Your Stats</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <StatsCard title="Total Videos" value={videos.length} icon={<FiVideo />} color="blue" />
          <StatsCard
            title="Total Views"
            value={videos.reduce((acc, video) => acc + (video.views || 0), 0)}
            icon={<FiEye />}
            color="purple"
          />
        </div>
        <h2 className="text-2xl mt-8 mb-4 text-[#3C7BAA]">📹 Your Uploaded Videos</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {videos.length > 0 ? videos.map(video => (
            <VideoCard key={video._id} video={video} onDelete={handleDelete}/>
          )) : (
            <p className="text-gray-500">No videos uploaded yet.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
    
  );
}
