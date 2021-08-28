import { Queue, QueueEvents } from 'bullmq';

const profileQueue: Queue = new Queue('getProfiles', {
  connection: {
    host: 'localhost',
    port: 32200,
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

const queueEvents = new QueueEvents('getProfiles');

queueEvents.on('completed', (jobId: string) => {
  console.log(`profile ${jobId} retrieved`);
});

export const saveLinks = async (links: object): Promise<void> => {
  Object.keys(links).forEach(async (key) => {
    await profileQueue.add(key, links, {
      jobId: key,
    });
    console.log(`saving ${key} as a job`);
  });
};
