import cron from 'node-cron';
import { streamService } from '../utils/init';
import { Logger } from '../utils/logger';

export const startStreamCronJob = () => {
  cron.schedule('*/1 * * * *', () => {
    Logger.log('Running scheduled task to update stream statuses...');
    streamService.pingAllStreams();
  });
};
