import { redisClient } from '../interfaces/redis-connector';
import { fdatingParams } from './get-params';

const filtersKey = 'filters';

export const compareFilters = async (
  filters: fdatingParams
): Promise<fdatingParams> => {
  let savedFilters = await redisClient.aGet(filtersKey);
  if (Object.keys(savedFilters).length === 0)
    await redisClient.aSet(filtersKey, JSON.stringify(filters));
  else {
    const newFilters = JSON.stringify(filters);
    if (JSON.stringify(savedFilters) === newFilters) return savedFilters;
    else {
      await redisClient.aSet(filtersKey, newFilters);
      return filters;
    }
  }
};
