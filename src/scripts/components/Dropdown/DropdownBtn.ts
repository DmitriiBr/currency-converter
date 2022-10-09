import { MainDropdown } from '.';
import { DropdownTitle } from './DropdownTitle';
import { DropdownArrow } from './DropdownArrow';
import { DropdownList } from './DropdownList';
import { dropdownID } from './Dropdown';

export class DropdownBtn extends MainDropdown {
  private btnClass: string;
  private title;
  private arrow: DropdownArrow;

  constructor(mainClass: string) {
    super(mainClass);
    this.btnClass = `${mainClass}__btn`;
    this.title = new DropdownTitle(mainClass);
    this.arrow = new DropdownArrow(mainClass);
  }

  render(): string {
    return `
      <button class="${this.btnClass} ${this.btnClass}--id_${dropdownID}"
        data-dropdown-btn="${dropdownID}"
      >
        ${this.title.render()}
        ${this.arrow.render()}
      </button>
    `;
  }

  element() {
    const btnElement = document.querySelector(`.${this.btnClass}`);
    const allBtnELements = document.querySelectorAll(`.${this.btnClass}`);

    return { btnElement, allBtnELements };
  }

  addListenerToggle(): void {
    const dropdownList = new DropdownList(this.mainClass);
    const { allBtnELements } = this.element();

    allBtnELements.forEach((elem, index) => {
      elem.addEventListener('click', () => {
        dropdownList.toggleList(index);
      });
    });
  }
}