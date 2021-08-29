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

// Parse profile data returned by axios
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

  // TODO extract photo link
  // TODO extract name
  const userName = $('.user-page').find('h4').text();

  console.log(userName);
};
