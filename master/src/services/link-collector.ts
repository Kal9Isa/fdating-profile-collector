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

  switch (resume) {
    case true:
      searchIndex = parseInt(await redisClient.aGet('searchIndex'));
      pageCount = parseInt(await redisClient.aGet('pageCount'));
      break;

    default:
      const searchPage = await searchSite(url, filters, 1);
      let searchInfo: SearchInfo = searchPageParser(searchPage);
      await saveSearchInfo(searchInfo);
      searchIndex = searchInfo.searchIndex;
      pageCount = searchInfo.pageCount;
      break;
  }

  for (let index = searchIndex; index < pageCount; index++) {
    const searchPage = await searchSite(url, filters, index);
    const profileLinks = linkExtractor(searchPage);
    await saveLinks(profileLinks, index);
    await redisClient.aSet('searchIndex', index.toString());
  }
};
