import axios from 'axios';
import { fdatingParams } from './get-params';
import { searchPageParser } from './parsers/search-page-parser';

export const searchSite = (url: string, filters: fdatingParams) => {
  // https://fdating.com/search?do=Search;gender=1;ageFrom=18;ageTo=99;photo=true;
  const { gender, startAge, endAge, photo } = filters;
  axios
    .get(
      `${url}gender=${gender};ageFrom=${startAge};ageTo=${endAge};photo=${photo};`
    )
    .then((res) => {
      // do sth with HTML payload
      searchPageParser(res);
    })
    .catch((err) => console.error(err));
};
