import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import flvjs from 'flv.js';

const useStreamPlayer = (url: string) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkMimeType = async (url: string): Promise<string | null> => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      const contentType = response.headers.get('Content-Type');
      console.log('Content-Type:', contentType);
      if (contentType) {
        const contentTypeLower = contentType.toLowerCase();
        if (contentType.includes('mp4')) {
          return 'mp4';
        } else if (contentTypeLower.includes('mpegurl')) {
          return 'hls';
        } else if (contentTypeLower.includes('flv')) {
          return 'flv';
        }
      }
      return null;
    } catch (err) {
      console.error('Error checking MIME type:', err);
      return null;
    }
  };

  useEffect(() => {
    setError(null);

    const handleError = (message: string) => {
      setError(message);
    };

    const loadStream = async () => {
      const mimeType = await checkMimeType(url);

      if (videoRef.current) {
        switch (mimeType) {
          case 'hls':
            if (Hls.isSupported()) {
              const hls = new Hls();
              hls.loadSource(url);
              hls.attachMedia(videoRef.current);
              hls.on(Hls.Events.MANIFEST_PARSED, () => {
                videoRef.current?.play().catch((error) => {
                  console.error('Error playing HLS stream:', error);
                  handleError(
                    `Слишком быстрое переключение потоков, попробуйте выбрать другой поток и вернуться к этому`,
                  );
                });
              });

              return () => {
                hls.destroy();
              };
            }
            break;

          case 'flv':
            if (flvjs.isSupported()) {
              const flvPlayer = flvjs.createPlayer({
                type: 'flv',
                url,
              });
              flvPlayer.attachMediaElement(videoRef.current);
              flvPlayer.load();

              flvPlayer.on(flvjs.Events.ERROR, (error) => {
                console.error('Error playing HLS stream:', error);
                handleError(
                  `Слишком быстрое переключение потоков, попробуйте выбрать другой поток и вернуться к этому`,
                );
              });

              flvPlayer.play();
              return () => {
                flvPlayer.destroy();
              };
            }
            break;

          case 'mp4':
            videoRef.current?.play().catch((error) => {
              console.error('Error playing HLS stream:', error);
              handleError(
                `Слишком быстрое переключение потоков, попробуйте выбрать другой поток и вернуться к этому`,
              );
            });
            return;

          default:
            handleError('Формат потока не поддерживается');
            break;
        }
      }
    };

    loadStream();
  }, [url]);

  return { videoRef, error };
};

export default useStreamPlayer;
