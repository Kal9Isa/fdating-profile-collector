import { redisClient } from '../interfaces/redis-connector';
import { fdatingParams } from './get-params';
import { searchPageParser, SearchInfo } from './parsers/search-page-parser';
import { linkExtractor } from './parsers/link-extractor';
import { saveLinks } from './save-links';
import { saveSearchInfo } from './save-search-info';
import { searchSite } from './search-site';

export const linkCollector = async (url: string, resume: boolean = false) => {
  let searchIndex: number, pageCount: number;
  const filters: fdatingParams = await redisClient.aGet('filters');

  console.log(`filters loaded`);

  switch (resume) {
    case true:
      let sI = await redisClient.aGet('searchIndex');
      let pC = await redisClient.aGet('pageCount');
      searchIndex = parseInt(sI);
      pageCount = parseInt(pC);
      console.log(`${pageCount} pages to go`);
      break;

    default:
      const searchPage = await searchSite(url, filters, 1);
      console.log(`grabbing search results`);
      let searchInfo: SearchInfo = searchPageParser(searchPage);
      await saveSearchInfo(searchInfo);
      searchIndex = searchInfo.searchIndex;
      pageCount = searchInfo.pageCount;
      console.log(`${pageCount} pages to go`);
      break;
  }

  console.log(`searchIndex: ${searchIndex}`);
  let sum = 0 + searchIndex * 12;

  for (let index = searchIndex; index < 3; index++) {
    console.log(`current page: ${index}`);
    const searchPage = await searchSite(url, filters, index);
    const profileLinks = linkExtractor(searchPage);

    console.log(`candidates saved: ${sum}`);
    sum += Object.keys(profileLinks).length;
    await saveLinks(profileLinks);
    await redisClient.aSet('searchIndex', index.toString());
  }
};
