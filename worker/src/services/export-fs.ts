import { UserProfile } from '../model/User';
import * as fs from 'fs-extra';

export const exportFS = async (user: UserProfile): Promise<void> => {
  fs.outputFile(`../../data/${user.profileId}/info.json`, JSON.stringify(user))
    .then(() => {
      console.log(`getting image from ${user.image}`);
    })
    .catch((err) => console.error(err));
};
