import React from 'react';
import useStreamPlayer from '../api/use.stream.player';
import styles from './VideoPlayer.module.css';

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  const { videoRef, error } = useStreamPlayer(url);

  return (
    <div>
      {error ? (
        <div className={styles['error-message']}>{error}</div>
      ) : (
        <video ref={videoRef} className={styles.player} />
      )}
    </div>
  );
};

export default VideoPlayer;
