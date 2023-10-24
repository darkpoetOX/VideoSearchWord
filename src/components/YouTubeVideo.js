import React from 'react';

const YouTubeVideo = ({ videoId }) => {
  return (
    <div className="youtube-video">
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube Video"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default YouTubeVideo;
