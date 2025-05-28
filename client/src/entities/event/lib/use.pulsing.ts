import { useEffect, useState } from 'react';
import { ONE_SECOND, ONE_SECOND_IN_MILLIS } from '../metadata/event.pulse';

const usePulsing = (createdAt: Date) => {
  const [isPulsing, setIsPulsing] = useState(false);

  useEffect(() => {
    const createdTime = new Date(createdAt).getTime();
    const now = Date.now();

    if (now - createdTime < ONE_SECOND_IN_MILLIS) {
      setIsPulsing(true);

      const intervalId = setInterval(() => {
        const timePassed = Date.now() - createdTime;

        if (timePassed >= ONE_SECOND_IN_MILLIS) {
          setIsPulsing(false);
          clearInterval(intervalId);
        }
      }, ONE_SECOND);

      return () => clearInterval(intervalId);
    }
  }, [createdAt]);

  return isPulsing;
};

export default usePulsing;
