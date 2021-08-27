import { AxiosResponse } from 'axios';
import cheerio from 'cheerio';

export const linkExtractor = (payload: AxiosResponse | void): void => {
  if (payload) {
    const html = payload.data;
    const $ = cheerio.load(html);
    const linkList = $('.c-block > .inner > center > ul > li > .image').attr(
      'href'
    );

    console.log(linkList);
    if (linkList) {
      console.log(linkList);

      for (const item of linkList) {
        console.log(item);
      }
    } else console.log('nothing');
  }
};
