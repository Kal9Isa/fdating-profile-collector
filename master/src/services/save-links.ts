import { Queue, QueueEvents, QueueScheduler } from 'bullmq';
import config from '../../../app.config';

const { redisUrl, redisPort } = config;

const profileQueue: Queue = new Queue('test', {
  connection: {
    host: redisUrl,
    port: redisPort,
  },
  defaultJobOptions: {
    removeOnComplete: true,
    removeOnFail: 1000,
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
  },
});

const queueEvents: QueueEvents = new QueueEvents('test', {
  connection: {
    host: redisUrl,
    port: redisPort,
  },
});

const queueScheduler = new QueueScheduler('test', {
  connection: {
    host: redisUrl,
    port: redisPort,
  },
});

queueEvents.on('completed', (res) => {
  console.log(`profile ${res.jobId} saved!`);
});

queueEvents.on('added', (res) => {
  console.log(`saving ${res.jobId}: ${res.data} as a job`);
});

export const saveLinks = async (links: object): Promise<void> => {
  Object.keys(links).forEach(async (key) => {
    await profileQueue.add(key, links[key], {
      jobId: key,
    });
  });
};

process.on('SIGINT', async () => {
  await queueScheduler.close();
});
