import { MainDropdown } from '.';
import { DropdownTitle } from './DropdownTitle';
import { DropdownArrow } from './DropdownArrow';
import { DropdownList } from './DropdownList';

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
      <button class="${this.btnClass}">
        ${this.title.render('It is my dropdown')}
        ${this.arrow.render()}
      </button>
    `;
  }

  element(): Element | null {
    const btnElement = document.querySelector(`.${this.btnClass}`);
    return btnElement;
  }

  addListenerToggle(): void {
    const dropdownList = new DropdownList(this.mainClass);
    this.element()?.addEventListener('click', () => {
      if (dropdownList.element()) {
        dropdownList.toggleList();
      }
    });
  }
}