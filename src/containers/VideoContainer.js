import React, { useState } from 'react';
import YouTubeVideo from '../components/YouTubeVideo';

function VideoContainer() {
  const [videoUrl, setVideoUrl] = useState('');
  const [showVideo, setShowVideo] = useState(false);

  const handleSearch = () => {
    setShowVideo(true);
  };

  return (
    <div className="video-container">
      <input
        type="text"
        placeholder="Paste YouTube video URL and press Enter"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        className="input-bar"
      />
      <button onClick={handleSearch}>Load Video</button>

      {showVideo && <YouTubeVideo videoUrl={videoUrl} />}
    </div>
  );
}

export default VideoContainer;

