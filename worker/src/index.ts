import { Worker, Job } from 'bullmq';

const worker = new Worker('test', async (job: Job) => {
  console.log('doing job');
});
