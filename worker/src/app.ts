import { Worker, Job } from 'bullmq';
import config from '../../app.config';
import { getProfilePage } from './services/get-profile-page';

export const app = async () => {
  const baseUrl: string = 'https://fdating.com';

  const worker = new Worker(
    'test',
    async (job: Job) => {
      console.log(`processing ${baseUrl}${job.data}`);
      getProfilePage(`${baseUrl}${job.data}`);
    },
    {
      connection: {
        host: config.redisUrl,
        port: config.redisPort,
      },
      limiter: {
        max: config.maxJobInInterval,
        duration: config.interval,
      },
    }
  );
};
