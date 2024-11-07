import React from 'react';
import useStreamPlayer from '../api/use.stream.player';
import styles from './VideoPlayer.module.css';

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  const videoRef = useStreamPlayer(url);

  return (
    <>
      <video ref={videoRef} className={styles.player} />
    </>
  );
};

export default VideoPlayer;
