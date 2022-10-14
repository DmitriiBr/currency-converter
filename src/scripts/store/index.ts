interface IStore {
  choosedItemRates: [number, number]
  choosedItemID: [number, number]
  choosedItemValues: [number, number],
  convertedValues: [number, number]
  fullValues: [number, number]
  staticValues: [number, number]
}

export const Store: IStore = {
  choosedItemRates: [0, 0],
  choosedItemID: [0, 0],
  choosedItemValues: [0, 0],
  convertedValues: [0, 0],
  fullValues: [0, 0],
  staticValues: [1, 1]
};