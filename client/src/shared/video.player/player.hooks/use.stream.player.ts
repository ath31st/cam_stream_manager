import dashjs from 'dashjs';
import flvjs from 'flv.js';
import Hls from 'hls.js';
import { useEffect, useRef, useState } from 'react';
import { determineStreamFormat } from './stream.format.detector';

const useStreamPlayer = (url: string) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const playerRef = useRef<{
    hls?: Hls;
    flv?: flvjs.Player;
    dash?: ReturnType<dashjs.MediaPlayerFactory['create']>;
  }>({});

  useEffect(() => {
    setError(null);

    const handleError = (message: string) => {
      setError(message);
    };

    const cleanupPreviousPlayer = () => {
      if (playerRef.current.hls) {
        playerRef.current.hls.destroy();
        playerRef.current.hls = undefined;
      }
      if (playerRef.current.flv) {
        playerRef.current.flv.destroy();
        playerRef.current.flv = undefined;
      }
      if (playerRef.current.dash) {
        playerRef.current.dash.reset();
        playerRef.current.dash = undefined;
      }
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = '';
      }
    };

    const initializePlayer = async () => {
      if (!videoRef.current) return;

      try {
        const format = await determineStreamFormat(url);

        switch (format) {
          case 'hls':
          case 'ts':
            if (Hls.isSupported()) {
              const hls = new Hls();
              playerRef.current.hls = hls;
              hls.loadSource(url);
              hls.attachMedia(videoRef.current);
              hls.on(Hls.Events.MANIFEST_PARSED, () => {
                videoRef.current?.play().catch(() => {});
              });
            } else if (
              videoRef.current.canPlayType('application/vnd.apple.mpegurl')
            ) {
              videoRef.current.src = url;
              videoRef.current.play().catch(() => {});
            } else {
              handleError('HLS не поддерживается');
            }
            break;

          case 'flv':
            if (flvjs.isSupported()) {
              const flvPlayer = flvjs.createPlayer({ type: 'flv', url });
              playerRef.current.flv = flvPlayer;
              flvPlayer.attachMediaElement(videoRef.current);
              flvPlayer.load();
              flvPlayer.play();
            } else {
              handleError('FLV не поддерживается');
            }
            break;

          case 'dash':
            if (dashjs.supportsMediaSource()) {
              const player = dashjs.MediaPlayer().create();
              playerRef.current.dash = player;
              player.initialize(videoRef.current, url, true);
            } else {
              handleError('DASH не поддерживается');
            }
            break;

          case 'native':
            videoRef.current.src = url;
            videoRef.current.play().catch(() => {});
            break;

          default:
            handleError('Формат потока не поддерживается');
        }
      } catch (error: unknown) {
        handleError(`Ошибка при определении формата потока: ${error}`);
      }
    };

    initializePlayer();

    return () => {
      cleanupPreviousPlayer();
    };
  }, [url]);

  return { videoRef, error };
};

export default useStreamPlayer;
