import React, { useState } from 'react';
import useHLS from '../api/use.hls';
import styles from './VideoPlayer.module.css';

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  const [isPlaying] = useState(false);
  const videoRef = useHLS(url, isPlaying);

  return (
    <>
      <video ref={videoRef} controls className={styles.player} />
    </>
  );
};

export default VideoPlayer;
