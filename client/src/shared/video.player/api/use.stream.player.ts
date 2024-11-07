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
    const isMp4 = url.endsWith('.mp4');
    const isH264 = url.includes('h264');
    const isH265 = url.includes('h265');

    const handleError = (message: string) => {
      setError(message);
    };

    if (videoRef.current) {
      if (Hls.isSupported() && isHls) {
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
      } else if (isTs) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current?.play();
        });

        return () => {
          hls.destroy();
        };
      } else if (isMp4 || isH264 || isH265) {
        if (
          videoRef.current.canPlayType('video/mp4; codecs="h264"') ||
          videoRef.current.canPlayType('video/mp4; codecs="hev1"')
        ) {
          videoRef.current.src = url;
          videoRef.current.addEventListener('loadedmetadata', () => {
            videoRef.current?.play();
          });
        } else {
          handleError('Формат потока не поддерживается для H.264 или H.265.');
        }
      } else {
        handleError('Формат потока не поддерживается');
      }
    }
  }, [url]);

  return { videoRef, error };
};

export default useStreamPlayer;
