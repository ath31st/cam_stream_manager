import cron from 'node-cron';
import { streamService } from '../utils/init';
import Logger from '../utils/logger';

export const startStreamCronJob = () => {
  const cronSchedule = process.env.CRON_SCHEDULE;

  if (!cronSchedule) {
    Logger.log('CRON_SCHEDULE is not set. Scheduled task will not run.');
    return;
  }

  cron.schedule(cronSchedule, () => {
    Logger.log(
      `Running scheduled task to update stream statuses with cron schedule: ${cronSchedule}...`,
    );
    streamService.pingAllStreams();
  });
};
