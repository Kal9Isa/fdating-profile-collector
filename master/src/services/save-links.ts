import { Queue, QueueEvents } from 'bullmq';

const profileQueue: Queue = new Queue('getProfiles', {
  connection: {
    host: '194.5.207.227',
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

const queueEvents: QueueEvents = new QueueEvents('getProfiles', {
  connection: {
    host: '194.5.207.227',
    port: 32200,
  },
});

queueEvents.on('completed', (res) => {
  console.log(`profile ${res.jobId} retrieved`);
});

queueEvents.on('added', (res) => {
  console.log(`saving ${res.jobId}: ${res.data} as a job`);
});

export const saveLinks = async (links: object): Promise<void> => {
  Object.keys(links).forEach(async (key) => {
    await profileQueue.add(key, links, {
      jobId: key,
    });
  });
};
