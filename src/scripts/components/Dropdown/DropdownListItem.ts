import { IDropdownListItem } from '../../data/types';
import { DropdownList } from './DropdownList';
import { DropdownTitle } from './DropdownTitle';
import { dropdownID } from './Dropdown';
import { currencyRatesToArray, shortString } from '../../utils';
import { getAllElements } from '../../Main/GetElement';
import { classAdd, classRemove, IChangableElementByClass } from '../../Main/ChangeElementClass';
import { RenderElementNew } from '../../Main/RenderElement';
import { currencyRatesValidNames } from '../../data';
import { Store } from '../../store';

export class DropdownListItem {
  private listItemClass: string;

  constructor(listClass: string) {
    this.listItemClass = `${listClass}--item`;
  }

  render({ text, index }: IDropdownListItem, key: number): Node {
    const currencyName = text + ' - ' + currencyRatesValidNames[key];

    const element = new RenderElementNew({
      tagName: 'li',
      className: [this.listItemClass, `${this.listItemClass}--id_${dropdownID}`],
      dataset: {
        'key': String(key),
        'translate-value': `${index * 100}%`
      },
      inner: shortString(currencyName),
      attributes: {
        title: currencyName
      },
      actions: {
        click: this.handleChooseItem(dropdownID, this.listItemClass, key, currencyName)
      }
    });

    return element.render();
  }

  handleChooseItem(dropdownID: number, listItemClass: string, key: number, currencyName: string) {
    const mainClass = listItemClass.slice(0, this.listItemClass.indexOf('_'));
    const dropdownTitle = new DropdownTitle(mainClass);
    const dropdownList = new DropdownList(mainClass);
    const highlight = `${this.listItemClass}--highlight`;

    return (e?: Event) => {
      const currentItem: IChangableElementByClass = {
        elementClassName: `${this.listItemClass}--id_${dropdownID}`,
        changableClassName: highlight,
        index: key,
      };

      classRemove({ ...currentItem, all: true });
      classAdd(currentItem);

      getAllElements(dropdownTitle.getClass())[dropdownID].textContent = currencyName;
      dropdownList.toggleList(dropdownID);

      Store.choosedItemID[dropdownID] = key;
      Store.choosedItemRates[dropdownID] = currencyRatesToArray()[key][1];
    };
  }
}