import { MainDropdown } from '.';
import { DropdownListItem } from './DropdownListItem';
import { dropdownID } from './Dropdown';
import { currencyRatesToArray } from '../../utils';
import { getAllElements } from '../../Main/GetElement';
import { RenderElementNew } from '../../Main/RenderElement';

export class DropdownList extends MainDropdown {
  private listClass: string;
  private listItem: DropdownListItem;

  constructor(mainClass?: string) {
    super(mainClass);
    this.listClass = `${mainClass}__list` || `${this.mainClass}__list`;
    this.listItem = new DropdownListItem(this.listClass);
  }

  render(): Node {
    const listData = currencyRatesToArray();
    const listItems: Node[] = listData.map((_, key) => this.listItem.render(
      { text: listData[key][0], index: key }, key));

    const list = new RenderElementNew({
      tagName: 'ul',
      className: [this.listClass, `${this.listClass}--id_${dropdownID}`],
      inner: listItems
    });

    const wrapper = new RenderElementNew({
      tagName: 'div',
      className: [`${this.listClass}--wrapper`],
      inner: [list.render()]
    });

    return wrapper.render();
  }

  toggleList(i = 0) {
    const allListWrapperElements = getAllElements(`${this.listClass}--wrapper`);
    allListWrapperElements[i].classList.toggle(`${this.listClass}--wrapper--show`);
  }

  addListenerMouseOver() {
    const allListELements = getAllElements(this.listClass);

    allListELements.forEach(elem => {
      elem.addEventListener('mouseover', (e: Event) => {
        const { target } = e;

        if (target instanceof HTMLElement) {
          const translateValue = target.dataset.translateValue;
          translateValue ? (elem as HTMLElement).style.setProperty('--translate-value', translateValue) : null;
        }
      });
    });
  }

  addAllListeners() {
    this.addListenerMouseOver();
    this.listItem.addListenerChooseItem();
  }
}