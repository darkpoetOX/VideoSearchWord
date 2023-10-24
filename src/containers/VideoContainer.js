import { useState} from 'react';


function VideoContainer() {
  const [searchWord, setSearchWord] = useState('');

  const handleSearch = (word) => {
    setSearchWord(word);
  };


  return (
    <div className="video-container">
      {/* <VideoComponent transcript={transcript} searchWord={searchWord} /> */}
      <input
        type="text"
        placeholder="Search for a word"
        value={searchWord}
        onChange={(e) => handleSearch(e.target.value)}
        className="input-bar" 
      />
    </div>
  );
}

export default VideoContainer;
