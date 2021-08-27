import { AxiosResponse } from 'axios';
import cheerio from 'cheerio';

export const searchPageParser = (payload: AxiosResponse) => {
  const html = payload.data;
  const $ = cheerio.load(html);
  const searchInfo = $('.c-block > .inner > center > div > b');

  let resultInfo: number[] = [];
  for (const item of searchInfo) {
    let value = $(item).text();
    resultInfo.push(parseInt(value));
  }

  resultInfo = [...new Set(resultInfo)];

  console.log(resultInfo);
};

// let links = [];
//   const html = payload.data;
//   const $ = cheerio.load(html);
//   const forecastDays = $('.monthly-daypanel');

//   // Extract links to all daily forecasts available on the page
//   forecastDays.each(function () {
//     let link = $(this).attr('href');
//     if (link) links.push(link);
//   });

//   return links;
