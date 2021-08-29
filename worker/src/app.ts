import { Worker, Job } from 'bullmq';

export const app = async () => {
  const baseUrl: string = 'https://fdating.com';

  const worker = new Worker(
    'test',
    async (job: Job) => {
      console.log(`sending req to ${baseUrl}${job.data}`);
    },
    {
      connection: {
        host: '194.5.207.227',
        port: 32200,
      },
      limiter: {
        max: 1,
        duration: 1000,
      },
    }
  );
};
