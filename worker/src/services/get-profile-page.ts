import axios, { AxiosResponse } from 'axios';

export const getProfilePage = async (url: string): Promise<AxiosResponse> => {
  const result = await axios
    .get(url)
    .then((res: AxiosResponse) => res)
    .catch((err: string) => console.error(err));
  if (result) return result;
};
