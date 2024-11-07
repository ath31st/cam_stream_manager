import { useRef, useEffect } from 'react';

const useH264H265Stream = (url: string, isPlaying: boolean) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current && 'MediaSource' in window) {
      const mediaSource = new MediaSource();
      videoRef.current.src = URL.createObjectURL(mediaSource);

      const handleSourceOpen = () => {
        const sourceBuffer = mediaSource.addSourceBuffer(
          'video/mp4; codecs="avc1.640029, hev1.1.6.L93.90"',
        );
        fetch(url)
          .then((response) => response.arrayBuffer())
          .then((data) => {
            sourceBuffer.appendBuffer(data);
            sourceBuffer.addEventListener('updateend', () => {
              if (isPlaying) {
                videoRef.current?.play();
              }
              mediaSource.endOfStream();
            });
          });
      };

      mediaSource.addEventListener('sourceopen', handleSourceOpen);

      return () => {
        mediaSource.removeEventListener('sourceopen', handleSourceOpen);
      };
    }
  }, [url, isPlaying]);

  return videoRef;
};

export default useH264H265Stream;
