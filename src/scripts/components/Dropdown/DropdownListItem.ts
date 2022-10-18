import {
  IDropdownListItem,
  IChoosedItem,
  IChangableElementByClass,
} from '../../types/types';
import { DropdownList } from './DropdownList';
import { DropdownTitle } from './DropdownTitle';
import { dropdownID } from './Dropdown';
import { getAllElements, parsedCurrencyRates, shortString } from '../../utils';
import { classAdd, classRemove } from '../../Main/ChangeElementClass';
import { RenderElement } from '../../Main/RenderElement';
import { dispatchStore } from '../../store';
import { Input } from '../CurrencyInput/CurrencyInput';
import { ConvertionsTitle } from '../ConvertionsTitle/ConvertionsTitle';
import { SearchInput } from '../SearchInput/SearchInput';

export class DropdownListItem {
  private listItemClass: string;

  constructor(listClass: string) {
    this.listItemClass = `${listClass}--item`;
  }

  getClass() {
    return this.listItemClass;
  }

  render({ currencyCode, currencyName, key }: IDropdownListItem): HTMLElement {
    const fullCurrencyName = currencyCode + ' - ' + currencyName;
    const choosedItem: IChoosedItem = {
      dropdownID,
      listItemClass: this.listItemClass,
      key,
      fullCurrencyName,
    };
    const translateValue = key + 1;

    const listItemElement = new RenderElement({
      tagName: 'li',
      className: [
        this.listItemClass,
        `${this.listItemClass}--id_${dropdownID}`,
      ],
      dataset: {
        key: String(key),
        'translate-value': `${translateValue * 100}%`,
      },
      inner: `<strong>${currencyCode}&nbsp;</strong>- ${shortString(
        currencyName
      )}`,
      attributes: {
        title: currencyName,
      },
      actions: {
        click: this.handleChooseItem(choosedItem),
      },
    });

    return listItemElement.render();
  }

  handleChooseItem({
    dropdownID,
    listItemClass,
    key,
    fullCurrencyName,
  }: IChoosedItem) {
    const mainClass = listItemClass.slice(0, this.listItemClass.indexOf('_'));
    const dropdownTitle = new DropdownTitle(mainClass);
    const dropdownList = new DropdownList(mainClass);
    const highlight = `${this.listItemClass}--highlight`;
    const currencyInput = new Input('input');
    const convertionsTitlte = new ConvertionsTitle();
    const searchInput = new SearchInput('input');

    return (e?: Event) => {
      const currentItem: IChangableElementByClass = {
        elementClassName: `${this.listItemClass}--id_${dropdownID}`,
        changableClassName: highlight,
        index: key,
      };
      const allInputElements = getAllElements(currencyInput.getClass());

      classRemove({ ...currentItem, all: true });
      classAdd(currentItem);

      getAllElements(dropdownTitle.getClass())[dropdownID].textContent =
        fullCurrencyName;

      dropdownList.toggleList(dropdownID);

      dispatchStore('choosedItemID', dropdownID, key);
      dispatchStore(
        'choosedItemRates',
        dropdownID,
        parsedCurrencyRates[key].rate
      );
      dispatchStore('currencyNames', dropdownID, fullCurrencyName);

      allInputElements.forEach((elem, index) => {
        if (index !== dropdownID) {
          currencyInput.handleConvert(index)(e, elem);
        }
      });

      convertionsTitlte.updateTitle();
      searchInput.resetValue(`${this.listItemClass}--id_${dropdownID}`);
    };
  }
}
