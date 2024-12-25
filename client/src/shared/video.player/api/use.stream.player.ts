import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import flvjs from 'flv.js';

const useStreamPlayer = (url: string) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);

    const isHls = url.endsWith('.m3u8');
    const isFlv = url.endsWith('.flv');
    const isTs = url.endsWith('.ts');

    const handleError = (message: string) => {
      setError(message);
    };

    if (videoRef.current) {
      if (Hls.isSupported() && (isHls || isTs)) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current?.play();
        });

        return () => {
          hls.destroy();
        };
      } else if (isFlv && flvjs.isSupported()) {
        const flvPlayer = flvjs.createPlayer({
          type: 'flv',
          url,
        });
        flvPlayer.attachMediaElement(videoRef.current);
        flvPlayer.load();
        flvPlayer.play();

        return () => {
          flvPlayer.destroy();
        };
      } else {
        handleError('Формат потока не поддерживается');
      }
    }
  }, [url]);

  return { videoRef, error };
};
export default useStreamPlayer;
