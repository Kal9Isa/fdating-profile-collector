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

const baseUrl: string = 'https://fdating.com';
const searchUrl: string = 'https://fdating.com/search?do=Search;';

const main = async (): Promise<void> => {
  const userParams = getParams(process.argv.slice(2));

  let searchParams = await compareFilters(userParams);
  let searchPage = await searchSite(searchUrl, searchParams);
  // let searchInfo: SearchInfo = searchPageParser(searchPage);
  // saveSearchInfo(searchInfo);
  linkExtractor(searchPage);
};

main();
