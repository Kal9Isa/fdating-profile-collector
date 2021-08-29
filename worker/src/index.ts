import { Worker } from 'bullmq';
import path from 'path';

const main = (): void => {
  const processorFile = path.join(__dirname, 'processor.ts');
  const worker: Worker = new Worker('getProfiles', processorFile, {
    connection: {
      host: '194.5.207.227',
      port: 32200,
    },
    limiter: {
      max: 5,
      duration: 1000,
    },
  });

  worker.on('drained', async () => {
    console.log('No jobs left');
    await worker.close();
  });

  // worker.on('error', (err) => {
  //   console.error(err);
  // });

  process.on('SIGINT', async () => {
    await worker.close();
  });
};

main();
