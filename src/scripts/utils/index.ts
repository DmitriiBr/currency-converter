import { fetchedData } from '../data';
import { commonCurrencies } from '../data/commonCurrencies';
import { CustomNodeListOf, ICurrencyRates } from '../types/types';

export const elementGuard = (elem: HTMLElement | null): boolean => {
  return elem === null ? false : true;
};

const currencyRatesToArray = (data: ICurrencyRates) => {
  const filteredRates = Object.entries(data.rates)
    .filter((elem) => commonCurrencies[elem[0]])
    .map((elem) => {
      const parsedElem = {
        code: elem[0],
        name: commonCurrencies[elem[0]],
        rate: elem[1],
      };

      return parsedElem;
    });

  return filteredRates;
};

export const parsedCurrencyRates = currencyRatesToArray(fetchedData);

export const shortString = (str: string): string => {
  if (str.length > 20) {
    return str.slice(0, 20) + '...';
  } else {
    return str;
  }
};

export const getElement = (selector: string) => {
  const element = document.querySelector(`.${selector}`);
  return element;
};

export const getAllElements = (selector: string): CustomNodeListOf => {
  const elements = document.querySelectorAll(`.${selector}`);
  return elements;
};

export const fixValue = (value: number) => {
  if (value.toFixed(2) === '1.00') return '1';

  for (let i = 2; i <= 6; i++) {
    if (value.toFixed(i)[i] !== '0') return value.toFixed(i);
  }

  return value.toFixed(7);
};
