import { DropdownListItem } from './DropdownListItem';
import { dropdownID } from './Dropdown';
import { getAllElements, parsedCurrencyRates } from '../../utils';
import { RenderElement } from '../../Main/RenderElement';
import { IDropdownListItem, IListItemObject } from '../../types/types';
import { SearchInput } from '../SearchInput/SearchInput';

export class DropdownList {
  private listClass: string;
  private listItem: DropdownListItem;

  constructor(mainClass?: string) {
    this.listClass = `${mainClass}__list` || `${mainClass}__list`;
    this.listItem = new DropdownListItem(this.listClass);
  }

  render(): Node {
    const listData = parsedCurrencyRates;
    const listItems: IListItemObject[] = listData.map(({ code, name }, i) => {
      const item: IDropdownListItem = {
        currencyCode: code,
        currencyName: name,
        key: i,
      };

      const listItemObject: IListItemObject = {
        code,
        name,
        element: this.listItem.render(item),
      };

      return listItemObject;
    });

    const searchItem = new RenderElement({
      tagName: 'li',
      className: [this.listItem.getClass(), 'search-list-item'],
      inner: [new SearchInput('input').render(dropdownID, listItems)],
    });

    const list = new RenderElement({
      tagName: 'ul',
      className: [this.listClass, `${this.listClass}--id_${dropdownID}`],
      inner: [searchItem.render(), ...listItems.map(({ element }) => element)],
    });

    const wrapper = new RenderElement({
      tagName: 'div',
      className: `${this.listClass}--wrapper`,
      inner: [list.render()],
      actions: {
        mouseover: this.handleMouseOver,
      },
    });

    return wrapper.render();
  }

  toggleList(i = 0) {
    const allListWrapperElements = getAllElements(`${this.listClass}--wrapper`);
    allListWrapperElements.forEach((elem, index) => {
      if (index === i) {
        elem.classList.toggle(`${this.listClass}--wrapper--show`);
      } else {
        elem.classList.remove(`${this.listClass}--wrapper--show`);
      }
    });
  }

  handleMouseOver(e?: Event, element?: Element) {
    if (e) {
      const { target } = e;
      if (target instanceof HTMLElement) {
        const translateValue = target.dataset.translateValue;

        if (element instanceof HTMLElement) {
          translateValue
            ? element.style.setProperty('--translate-value', translateValue)
            : null;
        }
      }
    }
  }
}
