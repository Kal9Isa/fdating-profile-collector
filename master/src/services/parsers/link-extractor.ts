import { AxiosResponse } from 'axios';
import cheerio from 'cheerio';

export const linkExtractor = (payload: AxiosResponse | void): void => {
  if (payload) {
    const html = payload.data;
    const $ = cheerio.load(html);
    const linkList = $('.c-block > .inner > center > ul > li > .image');

    console.log(linkList);
    if (linkList) {
      for (const item of linkList) {
        console.log($(item).attr('href'));
      }
    } else console.log('nothing');
  }
};
