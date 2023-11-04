import React, { useState, useEffect } from 'react';
import YouTubeVideo from '../components/YouTubeVideo';

function VideoContainer() {
  const [videoUrl, setVideoUrl] = useState('');
  const [transcript, setTranscript] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [loadVideoFlag, setLoadVideoFlag] = useState(false);
  const [changeUrlFlag, setChangeUrlFlag] = useState(false);

  const handleSearch = (word) => {
    setSearchWord(word);
  };

  const handleSearchClick = () => {
    // Trigger search when the "Search" button is clicked
    handleSearch(searchWord);
    setLoadVideoFlag(true); // Set loadVideoFlag to true when the "Search" button is clicked
  };

  const handleVideoUrlChange = (url) => {
    setVideoUrl(url);
    setLoadVideoFlag(false); // Set loadVideoFlag to false when the video URL changes
    setChangeUrlFlag(true); // Set changeUrlFlag to true when the video URL changes
  };

  useEffect(() => {
    if (changeUrlFlag) {
      // Only fetch captions if the video URL changed
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
      setChangeUrlFlag(false); // Reset changeUrlFlag
    }
  }, [videoUrl, changeUrlFlag]);

  return (
    <div className="video-container">
      <input
        type="text"
        placeholder="Paste YouTube video URL and press Enter"
        value={videoUrl}
        onChange={(e) => handleVideoUrlChange(e.target.value)}
        className="input-bar"
      />
      <button onClick={handleSearchClick}>Load</button>

      <input
        type="text"
        placeholder="Search for a word"
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
        className="input-bar"
      />
      <button onClick={handleSearchClick}>Search</button>

      {videoUrl && <YouTubeVideo videoUrl={videoUrl} transcript={transcript} searchWord={searchWord} loadVideoFlag={loadVideoFlag} />}
    </div>
  );
}

export default VideoContainer;


