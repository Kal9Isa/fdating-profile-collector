export interface UserProfile {
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
  image: string;
}

export class User implements UserProfile {
  profileId = '';
  registered = '';
  updated = '';
  lastLogged = '';
  name = '';
  country = '';
  state = '';
  city = '';
  maritalStatus = '';
  age = '';
  zodiac = '';
  height = '';
  weight = '';
  hairColor = '';
  eyeColor = '';
  children = '';
  smoking = '';
  drinking = '';
  languages = '';
  image = '';

  constructor() {}
}
