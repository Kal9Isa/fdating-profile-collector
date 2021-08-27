import minimist from 'minimist';

export interface fdatingParams {
  gender: number;
  startAge: number;
  endAge: number;
  photo: boolean;
}

export const getParams = (args: string[]): fdatingParams => {
  const parsedArgs = minimist(args);
  if (!!!parsedArgs.g) parsedArgs.g = 0;
  if (!!!parsedArgs.s) parsedArgs.s = 18;
  if (!!!parsedArgs.e) parsedArgs.e = 99;
  if (!!!parsedArgs.p) parsedArgs.p = true;
  return {
    gender: parsedArgs.g,
    startAge: parsedArgs.s,
    endAge: parsedArgs.e,
    photo: parsedArgs.p,
  };
};
