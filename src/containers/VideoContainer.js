import React, { useState, useEffect } from 'react';
import YouTubeVideo from '../components/YouTubeVideo';

function VideoContainer() {
  const [videoUrl, setVideoUrl] = useState('');
  const [transcript, setTranscript] = useState([]);
  const [searchWord, setSearchWord] = useState('');

  const handleSearch = (word) => {
    setSearchWord(word);
  };

  const handleSearchClick = () => {
    // Trigger search when the "Search" button is clicked
    handleSearch(searchWord);
  };

  useEffect(() => {
    async function fetchCaptions() {
      if (videoUrl) {
        try {
          const videoId = videoUrl.split('v=')[1];
          const response = await fetch(`https://www.youtube.com/api/timedtext?lang=en&v=${videoId}`);
          const data = await response.text();

          const parser = new DOMParser();
          const xmlDocument = parser.parseFromString(data, 'text/xml');
          const captions = Array.from(xmlDocument.getElementsByTagName('body')[0].getElementsByTagName('p'));


          const transcriptData = captions.map((caption) => ({
            text: caption.textContent,
            timestamp: parseFloat(caption.getAttribute('t')) / 1000,
          }));

          setTranscript(transcriptData);
        } catch (error) {
          console.error('Error fetching captions:', error);
        }
      }
    }

    fetchCaptions();
  }, [videoUrl]);

  return (
    <div className="video-container">
      <input
        type="text"
        placeholder="Paste YouTube video URL and press Enter"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        className="input-bar"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSearch(searchWord);
          }
        }}
      />
      <button onClick={() => handleSearch(searchWord)}>Load Video</button>

      <input
        type="text"
        placeholder="Search for a word"
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
        className="input-bar"
      />
      <button onClick={handleSearchClick}>Search</button>

      {videoUrl && <YouTubeVideo videoUrl={videoUrl} transcript={transcript} searchWord={searchWord} />}
    </div>
  );
}

export default VideoContainer;



