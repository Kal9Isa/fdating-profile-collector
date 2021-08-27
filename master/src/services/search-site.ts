import axios, { AxiosResponse } from 'axios';
import { fdatingParams } from './get-params';

export const searchSite = async (
  url: string,
  filters: fdatingParams
): Promise<AxiosResponse | void> => {
  // https://fdating.com/search?do=Search;gender=1;ageFrom=18;ageTo=99;photo=true;
  const { gender, startAge, endAge, photo } = filters;
  const result = await axios
    .get(
      `${url}gender=${gender};ageFrom=${startAge};ageTo=${endAge};photo=${photo};`
    )
    .then((res: AxiosResponse) => {
      return res;
    })
    .catch((err: string) => console.error(err));

  if (result) return result;
};
