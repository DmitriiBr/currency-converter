import { fetchedData } from '../data';
import { commonCurrencies } from '../data/commonCurrencies';
import { ICurrencyRates } from '../types/types';

export const elementGuard = (elem: HTMLElement | null): boolean => {
  return elem === null ? false : true;
};

const currencyRatesToArray = (data: ICurrencyRates) => {
  const filteredRates = Object.entries(data.rates)
    .filter((elem) => commonCurrencies[elem[0]])
    .map((elem) => {
      const parsedElem = {
        code: elem[0],
        nams: commonCurrencies[elem[0]],
        rate: elem[1],
      };

      return parsedElem;
    });

  return filteredRates;
};

export const parsedCurrencyRates = currencyRatesToArray(fetchedData);

export const shortString = (str: string): string => {
  if (str.length > 17) {
    return str.slice(0, 17) + '...';
  } else {
    return str;
  }
};

export const getElement = (selector: string) => {
  const element = document.querySelector(`.${selector}`);
  return element;
};

export const getAllElements = (selector: string) => {
  const elements = document.querySelectorAll(`.${selector}`);
  return elements;
};
