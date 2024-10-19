import React, { useEffect } from 'react';
import Player from '../../widgets/player';

const MainPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Cam stream player';
  }, []);

  return (
    <>
      <Player />
    </>
  );
};

export default MainPage;
