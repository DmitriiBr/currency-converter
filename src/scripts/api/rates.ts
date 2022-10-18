import { ICurrencyRates } from '../types/types';
import { commonCurrencies } from '../data/commonCurrencies';

interface IMappedRatesElement {
  code: string;
  name: string;
  rate: number;
}

export interface ICurrencyData {
  table: string;
  rates: IMappedRatesElement[];
  lastupdata: string;
}

export let currencyData: ICurrencyData = {
  table: '',
  rates: [],
  lastupdata: '',
};

export const currencyRatesToArrayFetched = (data: ICurrencyRates) => {
  const filteredRates: IMappedRatesElement[] = Object.entries(data.rates)
    .filter((elem) => commonCurrencies[elem[0]])
    .map((elem) => {
      const parsedElem: IMappedRatesElement = {
        code: elem[0],
        name: commonCurrencies[elem[0]],
        rate: elem[1],
      };

      return parsedElem;
    });

  currencyData = {
    table: data.table,
    rates: filteredRates,
    lastupdata: data.lastupdate,
  };

  const currencyDataJSONStringified = JSON.stringify(currencyData);

  localStorage.setItem('currencyData', currencyDataJSONStringified);
};

export const fetchRates = async (url: string) => {
  const response = await fetch(url);
  const data: ICurrencyRates = await response.json();

  return currencyRatesToArrayFetched(data);
};

export const getRatesData = async () => {
  const localData = localStorage.getItem('currencyData');

  if (localData === null) {
    console.log('Fetched data!!!');

    await fetchRates('https://cdn.cur.su/api/latest.json');
  } else {
    console.log('Not fethced data!!!');

    const currencyDataJSONParsed = JSON.parse(localData || '');

    currencyData = currencyDataJSONParsed;
  }
};

// export const fetchedAndParsedCurrencyRates = currencyRatesToArrayFetched(
//   fetchRates<ICurrencyRates>('https://cdn.cur.su/api/latest.json')
// );
