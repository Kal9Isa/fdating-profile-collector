// fdating.com

import { compareFilters } from './services/compare-filters';
import { getParams } from './services/get-params';
import { linkCollector } from './services/link-collector';

const baseUrl: string = 'https://fdating.com';
const searchUrl: string = 'https://fdating.com/search?do=Search;';

const main = async (): Promise<void> => {
  const userParams = getParams(process.argv.slice(2));

  const sameFilters = await compareFilters(userParams);
  let resume = false;
  if (sameFilters) resume = true;
  linkCollector(searchUrl, resume);
};

main();
