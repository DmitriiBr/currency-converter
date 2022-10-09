import { MainDropdown } from '.';
import { listItemsData } from '../../data';
import { IDropdownListItem } from '../../data/types';
import { DropdownList } from './DropdownList';
import { DropdownTitle } from './DropdownTitle';
import { dropdownID } from './Dropdown';

export class DropdownListItem extends MainDropdown {
  private listItemClass: string;
  constructor(listClass: string) {
    super();
    this.listItemClass = `${listClass}--item`;
  }

  render({ text, index }: IDropdownListItem, key: number): string {
    return `
      <li 
        class="${this.listItemClass} ${this.listItemClass}--id_${dropdownID}" 
        data-translate-value="${index}%"
        data-dropdown-list-item-id="${dropdownID}"
        data-key=${key}
      >
        ${text}
      </li>
    `;
  }


  allElements(id: number, all?: 'all') {
    const listItems: NodeListOf<Element> = document.querySelectorAll(`.${this.listItemClass}`);
    const listItemsByDropdownID = document.querySelectorAll(`.${this.listItemClass}--id_${id}`);

    if (all) return listItems;

    if (listItems) return listItemsByDropdownID;
    else {
      throw new Error('No list items found');
    }
  }

  listItemClassAdd(className: string, i: number, id: number) {
    this.allElements(id)[i].classList.add(className);
  }

  listItemClassRemove(className: string, index: number, id: number, all?: 'all') {
    if (all) {
      this.allElements(id).forEach((_, index) => {
        this.listItemClassRemove(className, index, id);
      });
    }

    this.allElements(id)[index].classList.remove(className);
  }

  addListenerChooseItem(mainClass?: string | undefined) {
    const dropdownTitle = new DropdownTitle(mainClass);
    const dropdownList = new DropdownList(mainClass);
    const highlight = `${this.listItemClass}--highlight`;

    this.allElements(0, 'all').forEach((elem: Node, index) => {
      elem.addEventListener('click', () => {
        const currentIndex = index % listItemsData.length;
        const dropdownID = Number((elem as HTMLElement).dataset.dropdownListItemId);

        this.listItemClassRemove(highlight, currentIndex, dropdownID, 'all');
        this.listItemClassAdd(highlight, currentIndex, dropdownID);
        dropdownList.toggleList(dropdownID);
        dropdownTitle.elements(dropdownID).textContent = listItemsData[currentIndex].text;
      });
    });
  }
}