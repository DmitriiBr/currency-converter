import { MainDropdown } from '.';

export class DropdownTitle extends MainDropdown {
  private titleClass: string | undefined;

  constructor(mainClass?: string) {
    super(mainClass);
    this.titleClass = `${mainClass}__title`;
  }

  render(title?: string) {
    return `
      <span class="${this.titleClass}">${this.dropdownChoosedItemName || title}</span>
    `;
  }

  element() {
    return document.querySelector(`.${this.titleClass}`);
  }
}