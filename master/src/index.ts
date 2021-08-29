import { app } from './app';
import config from '../../app.config';

const main = () => {
  if (!!!config.redisUrl) throw new Error('Redis URL not set');
  if (!!!config.redisPort) throw new Error('Redis port not set');

  app();
};

main();
