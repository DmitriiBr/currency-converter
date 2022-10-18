interface IStore {
  choosedItemRates: [number, number];
  choosedItemID: [number, number];
  choosedItemValues: [number, number];
  convertedValues: [number, number];
  currencyNames: [string, string];
}

export const Store: IStore = {
  choosedItemRates: [0, 0],
  choosedItemID: [0, 0],
  choosedItemValues: [0, 0],
  convertedValues: [0, 0],
  currencyNames: ['', ''],
};

export function dispatchStore(
  key: keyof IStore,
  index: number,
  value: string | number
) {
  Store[key][index] = value;
  localStorage.setItem(key, JSON.stringify(Store[key]));
}

export function getValueFromStore(
  key: keyof IStore,
  index: number
): number | string {
  return Store[key][index];
}
