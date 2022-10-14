import { IDropdownListItem, IChoosedItem, IChangableElementByClass } from '../../types/types';
import { DropdownList } from './DropdownList';
import { DropdownTitle } from './DropdownTitle';
import { dropdownID } from './Dropdown';
import { currencyRatesToArray, shortString, getAllElements } from '../../utils';
import { classAdd, classRemove } from '../../Main/ChangeElementClass';
import { RenderElement } from '../../Main/RenderElement';
import { currencyRatesValidNames } from '../../data';
import { Store } from '../../store';
import { MainCurrencyInput } from '../CurrencyInput';
import { ConvertionsTitle } from '../ConvertionsTitle/ConvertionsTitle';

export class DropdownListItem {
  private listItemClass: string;

  constructor(listClass: string) {
    this.listItemClass = `${listClass}--item`;
  }

  render({ text, key }: IDropdownListItem): Node {
    const currencyName = text + ' - ' + currencyRatesValidNames[key];
    const choosedItem: IChoosedItem = {
      dropdownID,
      listItemClass: this.listItemClass,
      key,
      currencyName
    };

    const listItemElement = new RenderElement({
      tagName: 'li',
      className: [
        this.listItemClass,
        `${this.listItemClass}--id_${dropdownID}`
      ],
      dataset: {
        key: String(key),
        'translate-value': `${key * 100}%`
      },
      inner: `<strong>${text}&nbsp;</strong>- ${shortString(currencyName).slice(5, currencyName.length)}`,
      attributes: {
        title: currencyName
      },
      actions: {
        click: this.handleChooseItem(choosedItem)
      }
    });

    return listItemElement.render();
  }

  handleChooseItem({ dropdownID, listItemClass, key, currencyName }: IChoosedItem) {
    const mainClass = listItemClass.slice(0, this.listItemClass.indexOf('_'));
    const dropdownTitle = new DropdownTitle(mainClass);
    const dropdownList = new DropdownList(mainClass);
    const highlight = `${this.listItemClass}--highlight`;
    const currencyInput = new MainCurrencyInput('input');
    const convertionsTitlte = new ConvertionsTitle();

    return (e?: Event) => {
      const currentItem: IChangableElementByClass = {
        elementClassName: `${this.listItemClass}--id_${dropdownID}`,
        changableClassName: highlight,
        index: key,
      };
      const allInputElements = getAllElements(currencyInput.getClass());

      classRemove({ ...currentItem, all: true });
      classAdd(currentItem);

      getAllElements(dropdownTitle.getClass())[dropdownID].textContent = currencyName;
      dropdownList.toggleList(dropdownID);

      Store.choosedItemID[dropdownID] = key;
      Store.choosedItemRates[dropdownID] = currencyRatesToArray()[key][1];
      Store.currencyNames[dropdownID] = currencyName;

      allInputElements.forEach((elem, index) => {
        if (elem instanceof HTMLInputElement && index !== dropdownID) {
          currencyInput.handleConvert(index)(e, elem);
        }
      });
      convertionsTitlte.updateTitle();
    };
  }
}