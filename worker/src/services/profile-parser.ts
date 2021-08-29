import { AxiosResponse } from 'axios';
import cheerio from 'cheerio';
import { User, UserProfile } from '../model/User';

export const profileParser = (payload: AxiosResponse): UserProfile => {
  const user = new User();
  const html = payload!.data;
  const $ = cheerio.load(html);
  const profileTable = $('.profile-tbl > tbody > tr');

  for (const item of profileTable) {
    const key = $(item).find('th').text().trim();
    const value = $(item).find('td').text().trim();
    user[key] = value;
  }

  const imageLink = $('.user-photo').find('img').attr('src');
  if (imageLink) user['image'] = imageLink;
  // TODO extract name

  return user;
};
