import { DropdownListItem } from './DropdownListItem';
import { dropdownID } from './Dropdown';
import { currencyRatesToArray } from '../../utils';
import { getAllElements, getElement } from '../../Main/GetElement';
import { RenderElementNew } from '../../Main/RenderElement';

export class DropdownList {
  private listClass: string;
  private listItem: DropdownListItem;

  constructor(mainClass?: string) {
    this.listClass = `${mainClass}__list` || `${mainClass}__list`;
    this.listItem = new DropdownListItem(this.listClass);
  }

  render(): Node {
    const listData = currencyRatesToArray();
    const listItems: Node[] = listData.map((_, key) => this.listItem.render(
      { text: listData[key][0], index: key }, key));

    const list = new RenderElementNew({
      tagName: 'ul',
      className: [this.listClass, `${this.listClass}--id_${dropdownID}`],
      inner: listItems,

    });

    const wrapper = new RenderElementNew({
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

  addAllListeners() {
    return 0;
  }
}