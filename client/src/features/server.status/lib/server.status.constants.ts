const intervalFromEnv = process.env.REACT_APP_HEALTH_CHECK_INTERVAL;

export const INTERVAL =
  intervalFromEnv && !isNaN(Number(intervalFromEnv))
    ? parseInt(intervalFromEnv, 10)
    : undefined;