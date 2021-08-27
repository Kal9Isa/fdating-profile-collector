import { redisClient } from '../interfaces/redis-connector';
import { fdatingParams } from './get-params';

const filtersKey = 'filters';

export const compareFilters = async (
  filters: fdatingParams
): Promise<boolean> => {
  let savedFilters = await redisClient.aGet(filtersKey);
  if (Object.keys(savedFilters).length === 0) {
    await redisClient.aSet(filtersKey, JSON.stringify(filters));
    return false;
  } else {
    const newFilters = JSON.stringify(filters);
    if (JSON.stringify(savedFilters) === newFilters) return true;
    else {
      await redisClient.aSet(filtersKey, newFilters);
      return false;
    }
  }
};
