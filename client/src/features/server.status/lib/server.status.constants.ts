const intervalFromEnv = import.meta.env.VITE_HEALTH_CHECK_INTERVAL;

export const INTERVAL =
  intervalFromEnv && !Number.isNaN(Number(intervalFromEnv))
    ? Number.parseInt(intervalFromEnv, 10)
    : undefined;
