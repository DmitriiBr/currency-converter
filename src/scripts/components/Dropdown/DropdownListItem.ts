import { IDropdownListItem } from '../../data/types';
import { DropdownList } from './DropdownList';
import { DropdownTitle } from './DropdownTitle';
import { dropdownID } from './Dropdown';
import { currencyRatesToArray } from '../../utils';
import { getAllElements } from '../../Main/GetElement';
import { classAdd, classRemove, IChangableElementByClass } from '../../Main/ChangeElementClass';
import { RenderElement } from '../../Main/RenderElement';
//import { currencyRatesValidNames } from '../../data';

export class DropdownListItem {
  private listItemClass: string;

  constructor(listClass: string) {
    this.listItemClass = `${listClass}--item`;
  }

  render({ text, index }: IDropdownListItem, key: number): string {
    const listItemElement = new RenderElement({
      tagName: 'li',
      className: [this.listItemClass, `${this.listItemClass}--id_${dropdownID}`],
      dataset: {
        'dropdown-list-item-id': String(dropdownID),
        'key': String(key),
        'translate-value': `${index * 100}%`
      },
      inner: text
    });

    return listItemElement.render();
  }

  addListenerChooseItem() {
    const mainClass = this.listItemClass.slice(0, this.listItemClass.indexOf('_'));
    const allListELements = getAllElements(this.listItemClass);
    const dropdownTitle = new DropdownTitle(mainClass);
    const dropdownList = new DropdownList(mainClass);
    const highlight = `${this.listItemClass}--highlight`;
    const listData = currencyRatesToArray();

    allListELements.forEach((elem: Element, index: number) => {
      elem.addEventListener('click', () => {
        if (elem instanceof HTMLElement) {
          const currentIndex = index % listData.length;
          const dropdownID = Number(elem.dataset.dropdownListItemId);
          const currentName = listData[currentIndex][0];

          const currentItem: IChangableElementByClass = {
            elementClassName: `${this.listItemClass}--id_${dropdownID}`,
            changableClassName: highlight,
            index: currentIndex,
          };

          classRemove({ ...currentItem, all: true });
          classAdd(currentItem);
          console.log(currentName);

          dropdownTitle.elements(dropdownID).textContent = currentName;
          dropdownList.toggleList(dropdownID);
        }
      });
    });
  }
}