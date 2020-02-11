import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import * as Hls from "hls.js";

function App() {
  const refVideo = useRef(null);
  const [hls, setHls] = useState(null);
  
  // on Mount
  useEffect(() => {
    if (refVideo.current && Hls.isSupported()) {
      setHls(new Hls());
    }
  }, []);
  
  // after initializing hls
  useEffect(() => {
    if (hls != null) {
      hls.attachMedia(refVideo.current);
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        console.log('video and hls.js are now bound together!');
        hls.loadSource('http://localhost/live/mystream.m3u8');
        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
          console.log('manifest loaded, found ' + data.levels.length + ' quality level');
        });
      });
    }
  }, [hls]);

  return (
    <div className="App">
      <video id="video" autoPlay="true" controls="controls" ref={refVideo} />
    </div>
  );
}

export default App;
