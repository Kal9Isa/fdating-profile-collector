import { redisClient } from '../interfaces/redis-connector';
import { SearchInfo } from './parsers/search-page-parser';

export const saveSearchInfo = async (searchInfo: SearchInfo): Promise<void> => {
  Object.keys(searchInfo).forEach(async (item) => {
    await redisClient.aSet(item, searchInfo[item]);
  });
};
