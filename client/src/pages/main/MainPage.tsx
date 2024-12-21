import React, { useEffect } from 'react';
import Player from '../../widgets/player';

const MainPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Stream player';
  }, []);

  return (
    <>
      <Player />
    </>
  );
};

export default MainPage;
