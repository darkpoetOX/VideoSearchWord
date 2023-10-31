import React, { useState } from 'react';
import YouTubeVideo from '../components/YouTubeVideo';

function VideoContainer() {
  const [videoUrl, setVideoUrl] = useState('');
  const [showVideo, setShowVideo] = useState(false);

  const handleSearch = () => {
    setShowVideo(true);
  };

  const handleInputChange = (e) => {
    setVideoUrl(e.target.value);
    setShowVideo(false); // Reset showVideo to false when the URL changes
  };

  return (
    <div className="video-container">
      <input
        type="text"
        placeholder="Paste YouTube video URL and press Enter"
        value={videoUrl}
        onChange={handleInputChange}
        className="input-bar"
      />
      <button onClick={handleSearch}>Load Video</button>

      {showVideo && <YouTubeVideo videoUrl={videoUrl} />}
    </div>
  );
}

export default VideoContainer;


