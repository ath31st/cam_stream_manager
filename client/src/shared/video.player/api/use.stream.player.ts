import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const useStreamPlayer = (url: string) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (Hls.isSupported() && videoRef.current) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current?.play();
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
        videoRef.current?.play();
      });
    }
  }, [url]);

  return videoRef;
};

export default useStreamPlayer;
