import type React from 'react';
import useStreamPlayer from '../player.hooks/use.stream.player';
import styles from './VideoPlayer.module.css';

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  const { videoRef, error } = useStreamPlayer(url);

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
            controls
            className={styles.player}
          />
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
