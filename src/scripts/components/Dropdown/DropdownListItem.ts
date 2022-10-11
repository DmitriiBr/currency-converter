import { IDropdownListItem } from '../../data/types';
import { DropdownList } from './DropdownList';
import { DropdownTitle } from './DropdownTitle';
import { dropdownID } from './Dropdown';
import { currencyRatesToArray } from '../../utils';
import { getAllElements } from '../../Main/GetElement';
import { classAdd, classRemove, IChangableElementByClass } from '../../Main/ChangeElementClass';
import { RenderElementNew } from '../../Main/RenderElement';
import { currencyRatesValidNames } from '../../data';

export class DropdownListItem {
  private listItemClass: string;

  constructor(listClass: string) {
    this.listItemClass = `${listClass}--item`;
  }

  render({ text, index }: IDropdownListItem, key: number): Node {
    const element = new RenderElementNew({
      tagName: 'li',
      className: [this.listItemClass, `${this.listItemClass}--id_${dropdownID}`],
      dataset: {
        'dropdown-list-item-id': String(dropdownID),
        'key': String(key),
        'translate-value': `${index * 100}%`
      },
      inner: text + ' ' + currencyRatesValidNames[key]
    });

    return element.render();
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
          const dropdownListItemID = Number(elem.dataset.dropdownListItemId);
          const currentName = listData[currentIndex][0];

          const currentItem: IChangableElementByClass = {
            elementClassName: `${this.listItemClass}--id_${dropdownListItemID}`,
            changableClassName: highlight,
            index: currentIndex,
          };

          classRemove({ ...currentItem, all: true });
          classAdd(currentItem);

          dropdownTitle.elements(dropdownListItemID).textContent = currentName;
          dropdownList.toggleList(dropdownListItemID);
        }
      });
    });
  }
}