import React from 'react';
import VideoContainer from './containers/VideoContainer';
import "./App.css";
import YouTubeVideo from './components/YouTubeVideo';


function App() {
  return (
    <div className="App">
      <h1>Video Player with Search and Markers</h1>
      <VideoContainer />
      <YouTubeVideo videoId="ioUJb8nuMPc" />
    </div>
  );
}

export default App;
