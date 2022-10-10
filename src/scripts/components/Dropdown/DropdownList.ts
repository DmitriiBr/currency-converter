import { MainDropdown } from '.';
import { DropdownListItem } from './DropdownListItem';
import { dropdownID } from './Dropdown';
import { currencyRatesToArray } from '../../utils';
import { getAllElements } from '../../Main/GetElement';
import { RenderElement } from '../../Main/RenderElement';
import { currencyRatesValidNames } from '../../data';
//import { currencyRatesValidNames } from '../../data';

export class DropdownList extends MainDropdown {
  private listClass: string;
  private listItem: DropdownListItem;

  constructor(mainClass?: string) {
    super(mainClass);
    this.listClass = `${mainClass}__list` || `${this.mainClass}__list`;
    this.listItem = new DropdownListItem(this.listClass);
  }

  render(): string {
    const listData = currencyRatesToArray();
    const list = new RenderElement({
      tagName: 'ul',
      className: [this.listClass, `${this.listClass}--id_${dropdownID}`],
      inner: [`${listData.map((_, key) =>
        this.listItem.render({ text: currencyRatesValidNames[key], index: key }, key)).join('')}`]
    });

    const wrapper = new RenderElement({
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