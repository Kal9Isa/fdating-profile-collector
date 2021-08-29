// fdating.com

import { compareFilters } from './services/compare-filters';
import { getParams } from './services/get-params';
import { linkCollector } from './services/link-collector';

const baseUrl: string = 'https://fdating.com';
const searchUrl: string = 'https://fdating.com/search?do=Search;';

export const app = async (): Promise<void> => {
  const userParams = getParams(process.argv.slice(2));
  console.log(`got user inputs`);

  const sameFilters = await compareFilters(userParams);
  let resume = false;
  if (sameFilters) {
    resume = true;
    console.log(`resume of operation`);
  }
  linkCollector(searchUrl, resume);
};
