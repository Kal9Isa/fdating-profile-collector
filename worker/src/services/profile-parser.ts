import { AxiosResponse } from 'axios';
import cheerio from 'cheerio';

// Parse profile data returned by axios
export const profileParser = (payload: AxiosResponse) => {
  const html = payload!.data;
  const $ = cheerio.load(html);
  const profileTable = $('.profile-tbl > tbody > tr');

  for (const item of profileTable) {
    const key = $(item).find('th').text().trim();
    const value = $(item).find('td').text().trim();
    console.log(`${key}: ${value}`);
  }
};
