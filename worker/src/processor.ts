import { SandboxedJob } from 'bullmq';

export const processor = async (job: SandboxedJob) => {
  const baseUrl: string = 'https://fdating.com';
  console.log(`doing ${baseUrl}${job.data}`);
};
