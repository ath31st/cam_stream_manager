import cron from 'node-cron';
import { streamService } from '../utils/init';

export const startStreamCronJob = () => {
  cron.schedule('*/1 * * * *', () => {
    console.log('Running scheduled task to update stream statuses...');
    streamService.pingAllStreams();
  });
};
