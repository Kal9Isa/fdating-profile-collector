import { Worker, Job } from 'bullmq';
import config from '../../app.config';
import { exportFS } from './services/export-fs';
import { getProfilePage } from './services/get-profile-page';
import { profileParser } from './services/profile-parser';

export const app = async () => {
  const baseUrl: string = 'https://fdating.com';

  const worker = new Worker(
    config.channelName,
    async (job: Job) => {
      console.log(`processing ${baseUrl}${job.data}`);
      const profilePage = await getProfilePage(`${baseUrl}${job.data}`);
      const data = profileParser(profilePage);
      await exportFS(data);
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
