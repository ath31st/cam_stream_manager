import React from 'react';
import useHLS from '../api/use.hls';
import styles from './VideoPlayer.module.css';

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  const videoRef = useHLS(url);

  return (
    <>
      <video ref={videoRef} className={styles.player} />
    </>
  );
};

export default VideoPlayer;
