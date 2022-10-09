export interface IDropdownListItem {
  text: string
  index: number;
}

interface IRates {
  [key: string]: number
}

export interface ICurrencyRates {
  base: 'USD',
  rates: IRates
}