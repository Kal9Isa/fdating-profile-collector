import { AxiosResponse } from 'axios';
import cheerio from 'cheerio';

export const linkExtractor = (payload: AxiosResponse | void): void => {
  let profileLinks: string[] = [];
  if (payload) {
    const html = payload.data;
    const $ = cheerio.load(html);
    const linkList = $('.c-block > .inner > center > ul > li > .image');

    for (const item of linkList!) {
      const link = $(item).attr('href');
      profileLinks.push(link!);
    }

    console.log(profileLinks);
  }
};
