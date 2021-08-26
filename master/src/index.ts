// fdating.com

import { getParams } from './services/get-params';

const baseUrl: string = 'https://fdating.com';
const searchUrl: string = 'https://fdating.com/search?do=Search;';

const userParams = getParams(process.argv.slice(2));

