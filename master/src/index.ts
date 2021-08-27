// fdating.com

import { compareFilters } from './services/compare-filters';
import { getParams } from './services/get-params';
import { searchSite } from './services/search-site';
import {
  searchPageParser,
  SearchInfo,
} from './services/parsers/search-page-parser';
import { saveSearchInfo } from './services/save-search-info';
import { linkExtractor } from './services/parsers/link-extractor';
import { linkCollector } from './services/link-collector';

const baseUrl: string = 'https://fdating.com';
const searchUrl: string = 'https://fdating.com/search?do=Search;';

const main = async (): Promise<void> => {
  const userParams = getParams(process.argv.slice(2));

  const sameFilters = await compareFilters(userParams);

  if (sameFilters) linkCollector(searchUrl, true);
};

main();
