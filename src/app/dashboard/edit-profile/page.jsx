'use client';

import Footer from '@/app/Components/Section/Footer';
import Header from '@/app/Components/Section/Header';
import { useEffect, useState } from 'react';

export default function EditProfilePage() {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    profilePicture: '',
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch('/api/users/profile');
      const data = await res.json();
      setUserData(data);
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'EduHush_Profile_Picture');

    setUploading(true);
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/dv3ggy4va/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setUserData({ ...userData, profilePicture: data.secure_url });
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/users/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    setLoading(false);
    alert('Profile updated!');
    setUserData('')
  };

  return (
    <div>
        <Header />
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded mt-22 mb-22">
            <h2 className="text-2xl font-bold mb-4 text-[#3C7BAA]">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                name="bio"
                value={userData.bio}
                onChange={handleChange}
                placeholder="Bio"
                className="w-full border p-2 rounded"
                />
                <div>
                <label className="block mb-1 font-medium">Profile Picture</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
                {userData.profilePicture && (
                    <img src={userData.profilePicture} alt="Profile" className="w-24 h-24 rounded-full mt-2" />
                )}
                </div>
                <button
                type="submit"
                disabled={loading}
                className="bg-[#3C7BAA] text-white px-4 py-2 rounded hover:bg-[#326b96]"
                >
                {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
        <Footer />
    </div>
    
  );
}
