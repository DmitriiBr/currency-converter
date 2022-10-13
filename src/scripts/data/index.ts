import { ICurrencyRates, IDropdownListItem } from './types';

export const listItemsData: IDropdownListItem[] = [
  { text: 'item1', index: 0 },
  { text: 'item2', index: 1 },
  { text: 'item3', index: 2 },
  { text: 'item4', index: 3 },
  { text: 'item5', index: 4 },
];

export const currencyRatesValidNames = [
  'United Arab Emirates Dirham',
  'Afghan Afghani',
  'Albanian Lek',
  'Armenian Dram',
  'Netherlands Antillean Guilder',
  'Angolan Kwanza equals',
  'Argentine Peso',
  'Australian Dollar',
  'Russian Rouble',
  'Euro',
  'United Arab Emirates Dirham',
  'Afghan Afghani',
  'Albanian Lek',
  'Armenian Dram',
  'Netherlands Antillean Guilder',
  'Angolan Kwanza equals',
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
    'AED1': 3.67297,
    'AFN1': 89.647021,
    'ALL1': 104.709024,
    'AMD1': 476.665393,
    'ANG1': 1.789593,
    'AOA1': 597.455,
    'ARS1': 99.2347,
    'AUD1': 1.338279,
    'RUB1': 62.501,
    'EUR1': 1.0262
  }
};