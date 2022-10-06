import { MainDropdown } from '.';
import { listItemsData } from '../../data';
import { IDropdownListItem } from '../../data/types';
import { DropdownList } from './DropdownList';
import { DropdownTitle } from './DropdownTitle';

export class DropdownListItem extends MainDropdown {
  private listItemClass: string;
  constructor(listClass: string) {
    super();
    this.listItemClass = `${listClass}--item`;
  }

  render({ text, index }: IDropdownListItem, key: number): string {
    return `
      <li 
        class="${this.listItemClass}" 
        data-translate-value="${index}%"
        data-key=${key}
      >
        ${text}
      </li>
    `;
  }

  allElements() {
    const listItems: NodeListOf<Element> = document.querySelectorAll(`.${this.listItemClass}`);
    if (listItems) {
      return listItems;
    } else {
      throw new Error('Not list items found');
    }
  }

  listItemClassAdd(className: string, index: number) {
    this.allElements()[index].classList.add(className);
  }

  listItemClassRemove(className: string, index: number, all?: 'all') {
    if (all) {
      this.allElements().forEach((_, index) => {
        this.listItemClassRemove(className, index);
      });
    }

    this.allElements()[index].classList.remove(className);
  }

  addListenerChooseItem(mainClass: string | undefined) {
    const dropdownTitle = new DropdownTitle(mainClass).element();
    const dropdownList = new DropdownList(mainClass);
    const highlight = `${this.listItemClass}--highlight`;

    this.allElements().forEach((elem: Node, index) => {
      elem.addEventListener('click', () => {
        this.dropdownChoosedItemName = listItemsData[index].text;
        this.listItemClassRemove(highlight, index, 'all');
        this.listItemClassAdd(highlight, index);
        dropdownList.toggleList();
        if (dropdownTitle) dropdownTitle.textContent = this.dropdownChoosedItemName;
      });
    });
  }
}