import { currencyRates } from '../data';

export const elementGuard = (elem: HTMLElement | null): boolean => {
  return elem === null ? false : true;
};

export const currencyRatesToArray = () => {
  return Object.entries(currencyRates.rates);
};