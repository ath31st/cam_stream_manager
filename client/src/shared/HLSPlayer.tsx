import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

interface HLSPlayerProps {
  url: string;
}

const HLSPlayer: React.FC<HLSPlayerProps> = ({ url }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (Hls.isSupported() && videoRef.current) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (isPlaying) {
          videoRef.current?.play();
        }
      });

      return () => {
        hls.destroy();
      };
    }

    if (
      videoRef.current &&
      videoRef.current.canPlayType('application/vnd.apple.mpegurl')
    ) {
      videoRef.current.src = url;
      videoRef.current.addEventListener('loadedmetadata', () => {
        if (isPlaying) {
          videoRef.current?.play();
        }
      });
    }
  }, [url, isPlaying]);

  const handlePlay = () => {
    setIsPlaying(true);
    videoRef.current?.play();
  };

  return (
    <div>
      <video
        ref={videoRef}
        controls
        style={{ width: '100%', height: 'auto' }}
      />
      <button onClick={handlePlay} disabled={isPlaying}>
        {isPlaying ? 'Playing...' : 'Play'}
      </button>
    </div>
  );
};

export default HLSPlayer;
