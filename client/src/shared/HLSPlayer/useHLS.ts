import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const useHLS = (url: string, isPlaying: boolean) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  return videoRef;
};

export default useHLS;
