import { app } from './app';
import config from '../../app.config';

const main = () => {
  if (!!!config.redisUrl) throw new Error('Redis URL not set');
  if (!!!config.redisPort) throw new Error('Redis port not set');
  if (!!!config.maxJobInInterval)
    throw new Error('Maximum number of jobs in interval not set');
  if (!!!config.interval) throw new Error('Interval not set');
  app();
};

main();
