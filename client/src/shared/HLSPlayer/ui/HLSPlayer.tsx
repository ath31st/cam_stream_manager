import React, { useState } from 'react';
import useHLS from '../api/useHLS';
import styles from './HLSPlayer.module.css';

interface HLSPlayerProps {
  url: string;
}

const HLSPlayer: React.FC<HLSPlayerProps> = ({ url }) => {
  const [isPlaying] = useState(false);
  const videoRef = useHLS(url, isPlaying);

  return (
    <>
      <video ref={videoRef} controls className={styles.player} />
    </>
  );
};

export default HLSPlayer;
