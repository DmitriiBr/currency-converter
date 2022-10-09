import { IDropdownListItem } from '../../data/types';
import { MainDropdown } from '.';
import { listItemsData } from '../../data';
import { DropdownListItem } from './DropdownListItem';

let listID = -1;

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
    listID++;

    return `
      <div class="${this.listClass}--wrapper">
        <ul class="${this.listClass} data-list-id="${listID}">
          ${listData.map(({ text, index }, key) =>
      this.listItem.render({ text, index: index * 100 }, key, listID)).join('')}
        </ul>
      </div>
    `;
  }

  element() {
    const listElement = document.querySelector(`.${this.listClass}`);
    const AllListWrapperElements = document.querySelectorAll(`.${this.listClass}--wrapper`);

    return { listElement, AllListWrapperElements };
  }

  toggleList(i = 0) {
    const { AllListWrapperElements } = this.element();
    AllListWrapperElements[i].classList.toggle(`${this.listClass}--wrapper--show`);
  }

  // Here i need to understand how to make animations undependful between two lists
  addListenerMouseOver() {
    const root = document.documentElement;
    const allListELements = document.querySelectorAll(`.${this.listClass}`);

    allListELements.forEach(elem => {
      elem.addEventListener('mouseover', (e: Event) => {
        const { target } = e;

        if (target) {
          const translateValue = (target as HTMLElement)?.dataset.translateValue;
          translateValue ? root.style.setProperty('--translate-value', translateValue) : null;
        }
      });
    });

    // listElement?.addEventListener('mouseover', (e: Event) => {
    //   const { target } = e;

    //   if (target) {
    //     const translateValue = (target as HTMLElement)?.dataset.translateValue;
    //     translateValue ? root.style.setProperty('--translate-value', translateValue) : null;
    //   }
    // });
  }

  addAllListeners() {
    this.addListenerMouseOver();
    this.listItem.addListenerChooseItem(this.mainClass);
  }
}