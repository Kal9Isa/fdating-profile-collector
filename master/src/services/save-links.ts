import { redisClient } from '../interfaces/redis-connector';

export const saveLinks = async (
  links: object,
  searchIndex: number
): Promise<void> => {
  await redisClient.aSet(searchIndex.toString(), JSON.stringify(links));
};
