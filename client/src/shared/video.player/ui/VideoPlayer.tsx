import React from 'react';
import useStreamPlayer from '../api/use.stream.player';
import styles from './VideoPlayer.module.css';

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  const { videoRef, error } = useStreamPlayer(url);

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className={styles['video-container']}>
      {error ? (
        <div className={styles['error-message']}>{error}</div>
      ) : (
        <>
          <video
            ref={videoRef}
            controlsList="nodownload noplaybackrate noremoteplayback"
            muted
            className={styles.player}
          />
          <button
            onClick={handleFullscreen}
            className={styles['fullscreen-btn']}
          >
            🔲
          </button>
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
