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
    const selectorsLength = document.querySelectorAll(`.${this.listClass}`).length;

    selectorsLength ? 0 : selectorsLength;

    return `
      <div class="${this.listClass}--wrapper">
        <ul class="${this.listClass}">
          ${listData.map(({ text, index }, key) =>
      this.listItem.render({ text, index: index * 100 }, key, selectorsLength)).join('')}
        </ul>
      </div>
    `;
  }

  element() {
    const listElement = document.querySelector(`.${this.listClass}`);
    const listWrapperElement = document.querySelector(`.${this.listClass}--wrapper`);
    const AllListWrapperElements = document.querySelectorAll(`.${this.listClass}--wrapper`);

    return { listElement, listWrapperElement, AllListWrapperElements };
  }

  toggleList(i = 0) {
    const { AllListWrapperElements } = this.element();
    AllListWrapperElements[i].classList.toggle(`${this.listClass}--wrapper--show`);
  }

  addListenerMouseOver() {
    const root = document.documentElement;
    const { listElement } = this.element();
    listElement?.addEventListener('mouseover', (e: Event) => {
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