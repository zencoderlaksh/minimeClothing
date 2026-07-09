import React, { useState, useEffect } from 'react';
import { Trash2, Plus, UploadCloud, Link as LinkIcon, Loader2 } from 'lucide-react';
import { useAuth } from '@clerk/react';

const ManageVideos = () => {
  const { getToken } = useAuth();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [addingLink, setAddingLink] = useState(false);
  const [videoLink, setVideoLink] = useState('');

  const fetchVideos = async () => {
    try {
      const token = await getToken();
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/videos`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setVideos(data.videos);
      }
    } catch (err) {
      console.error("Failed to fetch videos", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const token = await getToken();
      
      const formData = new FormData();
      formData.append("video", file);

      // Upload to Cloudinary via Backend
      const uploadRes = await fetch(`${import.meta.env.VITE_API_URL}/admin/videos/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      
      const uploadData = await uploadRes.json();
      
      if (uploadData.success) {
        // Save to Database
        const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/videos`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ url: uploadData.url, publicId: uploadData.publicId })
        });
        const data = await res.json();
        if (data.success) {
          setVideos([data.video, ...videos]);
        }
      } else {
        alert(uploadData.message || "Failed to upload video");
      }
    } catch (err) {
      console.error("Upload failed", err);
      alert("Error uploading video. File might be too large.");
    } finally {
      setUploading(false);
      e.target.value = null; // reset file input
    }
  };

  const handleAddLink = async () => {
    if (!videoLink.trim()) return;
    setAddingLink(true);
    try {
      const token = await getToken();
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/videos`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ url: videoLink })
      });
      const data = await res.json();
      if (data.success) {
        setVideos([data.video, ...videos]);
        setVideoLink('');
      } else {
        alert(data.message || "Failed to add video");
      }
    } catch (err) {
      console.error("Failed to add link", err);
    } finally {
      setAddingLink(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
    try {
      const token = await getToken();
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/videos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setVideos(videos.filter(v => v._id !== id));
      } else {
        alert(data.message || "Failed to delete video");
      }
    } catch (err) {
      console.error("Failed to delete video", err);
    }
  };

  if (loading) {
    return <div className="p-8">Loading videos...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-serif-display mb-8">Manage Instagram Videos</h2>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#ece8e1] mb-8">
        <h3 className="text-lg font-medium mb-4">Add New Video</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* File Upload Option */}
          <div className="p-6 border-2 border-dashed border-[#d4cec6] rounded-xl text-center">
            <UploadCloud className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-500 mb-4">Upload an MP4 or WebM video (Max 50MB)</p>
            <label className="bg-[color:var(--ink,#1a1612)] text-white px-6 py-2 rounded-full cursor-pointer hover:bg-black transition-colors inline-block">
              {uploading ? <Loader2 className="animate-spin inline-block w-5 h-5" /> : "Choose File"}
              <input 
                type="file" 
                accept="video/mp4,video/webm" 
                className="hidden" 
                onChange={handleFileUpload}
                disabled={uploading}
              />
            </label>
          </div>

          {/* Direct Link Option */}
          <div className="p-6 border-2 border-dashed border-[#d4cec6] rounded-xl text-center flex flex-col justify-center">
            <LinkIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-500 mb-4">Or paste a direct video link</p>
            <div className="flex gap-2 max-w-sm mx-auto w-full">
              <input 
                type="url" 
                placeholder="https://..." 
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
                className="flex-1 px-4 py-2 border border-[#ece8e1] rounded-full focus:outline-none focus:border-[#b8960c]"
              />
              <button 
                onClick={handleAddLink}
                disabled={addingLink || !videoLink.trim()}
                className="bg-[color:var(--ink,#1a1612)] text-white px-4 py-2 rounded-full hover:bg-black disabled:opacity-50"
              >
                {addingLink ? <Loader2 className="animate-spin w-5 h-5" /> : "Add"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video._id} className="bg-white rounded-2xl shadow-sm border border-[#ece8e1] overflow-hidden group relative">
            <div className="aspect-[9/16] bg-black">
              <video 
                src={video.url} 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                muted 
                loop 
                playsInline
                autoPlay
              />
            </div>
            
            <div className="absolute top-4 right-4 flex gap-2">
              <button 
                onClick={() => handleDelete(video._id)}
                className="w-8 h-8 rounded-full bg-white/90 text-red-500 flex items-center justify-center hover:bg-white hover:text-red-600 hover:scale-110 transition-all shadow-md"
                title="Delete Video"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="p-4 bg-white">
              <p className="text-xs text-gray-500 truncate">{video.url}</p>
            </div>
          </div>
        ))}
        {videos.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500">
            No videos uploaded yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageVideos;
