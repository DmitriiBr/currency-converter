import { DropdownListItem } from './DropdownListItem';
import { dropdownID } from './Dropdown';
import { currencyRatesToArray, getAllElements } from '../../utils';
import { RenderElement } from '../../Main/RenderElement';
import { IDropdownListItem } from '../../types/types';

export class DropdownList {
  private listClass: string;
  private listItem: DropdownListItem;

  constructor(mainClass?: string) {
    this.listClass = `${mainClass}__list` || `${mainClass}__list`;
    this.listItem = new DropdownListItem(this.listClass);
  }

  render(): Node {
    const listData = currencyRatesToArray();
    const listItems: Node[] = listData.map((elem, key) => {
      const item: IDropdownListItem = {
        text: elem[0],
        key
      };

      return this.listItem.render(item);
    });

    const list = new RenderElement({
      tagName: 'ul',
      className: [this.listClass, `${this.listClass}--id_${dropdownID}`],
      inner: listItems,
    });

    const wrapper = new RenderElement({
      tagName: 'div',
      className: [`${this.listClass}--wrapper`],
      inner: [list.render()],
      actions: {
        mouseover: this.handleMouseOver()
      },
    });

    return wrapper.render();
  }

  toggleList(i = 0) {
    const allListWrapperElements = getAllElements(`${this.listClass}--wrapper`);
    allListWrapperElements[i].classList.toggle(`${this.listClass}--wrapper--show`);
  }

  handleMouseOver() {
    return (e?: Event, element?: Element) => {
      if (e) {
        const { target } = e;
        if (target instanceof HTMLElement) {
          const translateValue = target.dataset.translateValue;

          if (element instanceof HTMLElement) {
            translateValue ? element.style.setProperty('--translate-value', translateValue) : null;
          }
        }
      }
    };
  }
}