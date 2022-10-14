// For creating list with its items
export interface IDropdownListItem { text: string, key: number; }


// For fetching in a future
export interface ICurrencyRates { base: 'USD', rates: IRates }
interface IRates { [key: string]: number }


// For changing class inside element by class name
export interface IChangableElementByClass {
  elementClassName: string
  changableClassName: string
  index: number
  all?: boolean
}


// For handleChooseListItem
export interface IChoosedItem {
  dropdownID: number
  listItemClass: string
  key: number
  currencyName: string
}


// RenderElement
export interface IDataset { [key: string | number]: string; }
export interface IActions { [key: string]: (e?: Event, element?: Element) => void; }
export interface IAttributes { [key: string | number]: string; }
export type Inner = Node[] | string;

export interface IElement {
  tagName: string
  className: string[]
  inner?: Inner
  type?: string
  dataset?: IDataset
  attributes?: IAttributes
  actions?: IActions
}