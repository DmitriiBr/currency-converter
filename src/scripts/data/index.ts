import { ICurrencyRates } from '../types/types';

export const currencyRatesValidNames = [
  'United Arab Emirates Dirham',
  'Afghan Afghani',
  'Albanian Lek',
  'Armenian Dram',
  'Netherlands Antillean Guilder',
  'Angolan Kwanza',
  'Argentine Peso',
  'Australian Dollar',
  'Russian Rouble',
  'Euro',
];

export const currencyRates: ICurrencyRates = {
  base: 'USD',
  rates: {
    'AED': 3.67297,
    'AFN': 89.647021,
    'ALL': 104.709024,
    'AMD': 476.665393,
    'ANG': 1.789593,
    'AOA': 597.455,
    'ARS': 99.2347,
    'AUD': 1.338279,
    'RUB': 62.501,
    'EUR': 1.0262,
  }
};