import dashjs from 'dashjs';
import flvjs from 'flv.js';
import Hls from 'hls.js';
import { useEffect, useRef, useState } from 'react';
import { determineStreamFormat } from './stream.format.detector';

const useStreamPlayer = (url: string) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);

    const handleError = (message: string) => {
      setError(message);
    };

    const initializePlayer = async () => {
      if (!videoRef.current) return;

      try {
        const format = await determineStreamFormat(url);

        switch (format) {
          case 'hls':
            if (Hls.isSupported()) {
              const hls = new Hls();
              hls.loadSource(url);
              hls.attachMedia(videoRef.current);
              hls.on(Hls.Events.MANIFEST_PARSED, () => {
                videoRef.current?.play();
              });

              return () => hls.destroy();
            }
            if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
              videoRef.current.src = url;
              videoRef.current.play();
            } else {
              handleError('HLS не поддерживается');
            }
            break;

          case 'flv':
            if (flvjs.isSupported()) {
              const flvPlayer = flvjs.createPlayer({ type: 'flv', url });
              flvPlayer.attachMediaElement(videoRef.current);
              flvPlayer.load();
              flvPlayer.play();

              return () => flvPlayer.destroy();
            }
            handleError('FLV не поддерживается');
            break;

          case 'dash':
            if (dashjs.supportsMediaSource()) {
              const player = dashjs.MediaPlayer().create();
              player.initialize(videoRef.current, url, true);
              return () => player.reset();
            }
            handleError('DASH не поддерживается');
            break;

          case 'native':
            videoRef.current.src = url;
            videoRef.current.play();
            break;

          default:
            handleError('Формат потока не поддерживается');
        }
      } catch (error: unknown) {
        handleError(`Ошибка при определении формата потока: ${error}`);
      }
    };

    initializePlayer();
  }, [url]);

  return { videoRef, error };
};

export default useStreamPlayer;
