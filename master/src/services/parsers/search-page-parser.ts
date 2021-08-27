import { AxiosResponse } from 'axios';
import cheerio from 'cheerio';

export interface SearchInfo {
  totalCandidates: number;
  searchIndex: number;
  pageCount: number;
}

export const searchPageParser = (payload: AxiosResponse | void): SearchInfo => {
  if (payload) {
    const html = payload.data;
    const $ = cheerio.load(html);
    const searchInfo = $('.c-block > .inner > center > div > b');

    let resultInfo: number[] = [];
    for (const item of searchInfo) {
      let value = $(item).text();
      resultInfo.push(parseInt(value));
    }

    resultInfo = [...new Set(resultInfo)];

    return {
      totalCandidates: resultInfo[0],
      searchIndex: resultInfo[1],
      pageCount: resultInfo[2],
    };
  } else
    return {
      totalCandidates: 0,
      searchIndex: 0,
      pageCount: 0,
    };
};
