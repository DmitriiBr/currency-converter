// For creating list with its items
export interface IDropdownListItem {
  currencyCode: string;
  currencyName: string;
  key: number;
}
export interface IListItemObject {
  code: string;
  name: string;
  element: Node;
}

// For fetching in a future
export interface ICurrencyRates {
  table: string;
  rates: IRates;
  lastupdate: string;
}
interface IRates {
  [key: string]: number;
}

// For changing class inside element by class name
export interface IChangableElementByClass {
  elementClassName: string;
  changableClassName: string;
  index: number;
  all?: boolean;
}

// For handleChooseListItem
export interface IChoosedItem {
  dropdownID: number;
  listItemClass: string;
  key: number;
  fullCurrencyName: string;
}

// RenderElement
export interface IDataset {
  [key: string | number]: string;
}
export interface IActions {
  [key: string]: (e?: Event, element?: Element) => void;
}
export interface IAttributes {
  [key: string | number]: string;
}
export type Inner = Node[] | string;

export interface IElement {
  tagName: string;
  className: string[] | string;
  inner?: Inner;
  type?: string;
  dataset?: IDataset;
  attributes?: IAttributes;
  actions?: IActions;
}
