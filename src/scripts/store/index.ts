interface IStore {
  choosedItemName: [string, string]
  choosedItemID: [number, number]
}

export const Store: IStore = {
  choosedItemName: ['', ''],
  choosedItemID: [0, 0]
};