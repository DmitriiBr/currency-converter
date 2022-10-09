import { MainDropdown } from '.';
import { DropdownListItem } from './DropdownListItem';
import { dropdownID } from './Dropdown';
import { currencyRatesToArray } from '../../utils';

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

    return `
      <div class="${this.listClass}--wrapper">
        <ul class="${this.listClass} ${this.listClass}--id_${dropdownID}">
          ${listData.map((item, key) =>
      this.listItem.render({ text: item[0], index: key * 100 }, key)).join('')}
        </ul>
      </div>
    `;
  }

  element() {
    const listElement = document.querySelector(`.${this.listClass}`);
    const AllListWrapperElements = document.querySelectorAll(`.${this.listClass}--wrapper`);

    return { listElement, AllListWrapperElements };
  }

  toggleList(i = 0) {
    const { AllListWrapperElements } = this.element();
    AllListWrapperElements[i].classList.toggle(`${this.listClass}--wrapper--show`);
  }

  addListenerMouseOver() {
    const allListELements = document.querySelectorAll(`.${this.listClass}`);

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
    this.listItem.addListenerChooseItem(this.mainClass);
  }
}