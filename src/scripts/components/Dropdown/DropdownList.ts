import { IDropdownListItem } from '../../data/types';
import { MainDropdown } from '.';
import { listItemsData } from '../../data';
import { DropdownListItem } from './DropdownListItem';

export class DropdownList extends MainDropdown {
  private listClass: string;
  private listItem: DropdownListItem;

  constructor(mainClass?: string) {
    super(mainClass);
    this.listClass = `${mainClass}__list` || `${this.mainClass}__list`;
    this.listItem = new DropdownListItem(this.listClass);
  }

  render(): string {
    const listData: IDropdownListItem[] = listItemsData;

    return `
      <ul class="${this.listClass}">
        ${listData.map(({ text, index }, key) =>
      this.listItem.render({ text, index: index * 100 }, key)).join('')}
      </ul>
    `;
  }

  element(): HTMLUListElement | null {
    const listElement = document.querySelector(`.${this.listClass}`);
    return (listElement as HTMLUListElement);
  }

  toggleList() {
    this.element()?.classList.toggle(`${this.listClass}--show`);
  }

  addListenerMouseOver() {
    const root = document.documentElement;
    this.element()?.addEventListener('mouseover', (e: Event) => {
      const { target } = e;
      if (target) {
        const translateValue = (target as HTMLElement)?.dataset.translateValue;
        translateValue ? root.style.setProperty('--translate-value', translateValue) : null;
      }
    });
  }

  addAllListeners() {
    this.addListenerMouseOver();
    this.listItem.addListenerChooseItem(this.mainClass);
  }
}