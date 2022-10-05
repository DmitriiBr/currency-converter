import { IDropdownListItem } from '../../data/types';
import { Dropdown } from '.';
import { listItemsData } from '../../data';
import { DropdownListItem } from './DropdownListItem';

export class DropdownList extends Dropdown {
  private listClass: string;

  constructor(listClass: string) {
    super();
    this.listClass = listClass;
  }

  render(): string {
    const listItem = new DropdownListItem();
    const listData: IDropdownListItem[] = listItemsData;

    return `
      <ul class="${this.listClass}">
        ${listData.map(({ text, index }) =>
      listItem.render({ text, index: index * 100 }, this.listClass)).join('')}
      </ul>
    `;
  }

  element(): HTMLUListElement | null {
    const listElement = document.querySelector(`.${this.listClass}`);

    return (listElement as HTMLUListElement);
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

  addListenerItemChoose() {
    const items = document.querySelectorAll(`.${this.listClass}--item`);

    items.forEach((item) => {
      item.addEventListener('click', () => console.log('clicked'));
    });
  }
}