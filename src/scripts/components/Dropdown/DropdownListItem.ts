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

  render({ text, index }: IDropdownListItem, key: number, listID: number): string {
    return `
      <li 
        class="${this.listItemClass}" 
        data-translate-value="${index}%"
        data-list-id="${listID}"
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
      throw new Error('No list items found');
    }
  }

  listItemClassAdd(className: string, i: number) {
    this.allElements()[i].classList.add(className);
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
    const dropdownTitle = new DropdownTitle(mainClass);
    const dropdownList = new DropdownList(mainClass);
    const highlight = `${this.listItemClass}--highlight`;

    this.allElements().forEach((elem: Node, index) => {
      elem.addEventListener('click', () => {
        const listID = Number((elem as HTMLElement).dataset.listId);
        this.dropdownChoosedItemName = listItemsData[index % listItemsData.length].text;
        this.listItemClassRemove(highlight, index, 'all');
        this.listItemClassAdd(highlight, index);
        dropdownList.toggleList(listID);

        if (dropdownTitle.elements(listID)) dropdownTitle.elements(listID).textContent = this.dropdownChoosedItemName;
      });
    });
  }
}