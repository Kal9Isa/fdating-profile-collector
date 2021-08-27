// fdating.com

import { compareFilters } from './services/compare-filters';
import { getParams } from './services/get-params';
import { searchSite } from './services/search-site';

const baseUrl: string = 'https://fdating.com';
const searchUrl: string = 'https://fdating.com/search?do=Search;';

const main = async (): Promise<void> => {
  const userParams = getParams(process.argv.slice(2));

  let searchParams = await compareFilters(userParams);
  let data = searchSite(searchUrl, searchParams);
  console.log(data);
};

main();
