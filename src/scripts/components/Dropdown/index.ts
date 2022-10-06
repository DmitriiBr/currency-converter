export class MainDropdown {
  protected mainClass: string | undefined;
  public dropdownChoosedItemName: string;

  constructor(mainClass?: string) {
    this.mainClass = mainClass;
    this.dropdownChoosedItemName = '';
  }
}