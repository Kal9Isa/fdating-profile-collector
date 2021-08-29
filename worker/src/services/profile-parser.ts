import { AxiosResponse } from 'axios';
import cheerio from 'cheerio';

// Parse profile data returned by axios
export const profileParser = (payload: AxiosResponse) => {
  const html = payload!.data;
  const $ = cheerio.load(html);
  const profileTable = $('.profile-tbl > tbody > tr');
  console.log(Object.keys(profileTable).length);
};
