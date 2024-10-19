import { useEffect, useState } from 'react';

const usePulsing = (createdAt: Date) => {
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    const createdTime = new Date(createdAt).getTime();
    const now = Date.now();

    if (now - createdTime < 60000) {
      setIsPulsing(true);

      const intervalId = setInterval(() => {
        const timePassed = Date.now() - createdTime;

        if (timePassed >= 60000) {
          setIsPulsing(false);
          clearInterval(intervalId);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [createdAt]);

  return isPulsing;
};

export default usePulsing;
