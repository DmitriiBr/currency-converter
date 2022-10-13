import { currencyRates } from '../data';

export const elementGuard = (elem: HTMLElement | null): boolean => {
  return elem === null ? false : true;
};

export const currencyRatesToArray = () => {
  return Object.entries(currencyRates.rates);
};

export const shortString = (str: string): string => {
  if (str.length > 21) {
    return str.slice(0, 21) + '...';
  } else {
    return str;
  }
};