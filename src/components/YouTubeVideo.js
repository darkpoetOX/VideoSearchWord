import React from 'react';

function YouTubeVideo({ videoUrl, loadVideoFlag }) {
  // Function to extract the video ID from the videoUrl
  function extractVideoId(videoUrl) {
    // Check if the videoUrl is valid
    if (videoUrl && videoUrl.includes('youtube.com/watch?v=')) {
      const videoId = videoUrl.split('v=')[1];
      return videoId;
    }
    return null;
  }

  const videoId = extractVideoId(videoUrl);

  if (loadVideoFlag && videoId) {
    return (
      <div className="video-container">
        <iframe
          title="YouTube Video"
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  } else {
    return (
      <div className="video-container">
        <p>Please enter YouTube video URL</p>
      </div>
    );
  }
}

export default YouTubeVideo;


