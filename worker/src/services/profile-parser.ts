import { AxiosResponse } from 'axios';
import cheerio from 'cheerio';

interface UserProfile {
  profileId: string;
  registered: string;
  updated: string;
  lastLogged: string;
  name: string;
  country: string;
  state: string;
  city: string;
  maritalStatus: string;
  age: string;
  zodiac: string;
  height: string;
  weight: string;
  hairColor: string;
  eyeColor: string;
  children: string;
  smoking: string;
  drinking: string;
  languages: string;
}

export const profileParser = (payload: AxiosResponse) => {
  let user = {};
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

  console.log(JSON.stringify(user));
};
