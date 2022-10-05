import { Dropdown } from '.';
import { DropdownBtn } from './DropdownBtn';
import { DropdownList } from './DropdownList';

export class DropdownController extends Dropdown {
  private list = new DropdownList(`${this.mainClass}__list`);
  private btn = new DropdownBtn(`${this.mainClass}__btn`);

  constructor(mainClass: string) {
    super(mainClass);
  }

  public renderDropdown() {
    const dropdownWrapper = document.createElement('div');
    dropdownWrapper.classList.add(this.mainClass || 'dropdown');

    dropdownWrapper.insertAdjacentHTML('afterbegin', `
        ${this.btn.render(this.mainClass || 'dropdown')}
        ${this.list.render()}
    `);

    return dropdownWrapper;
  }

  addListeners() {
    this.btn.addListenerToggle(this.list.element(), 'dropdown__list--show');
    this.list.addListenerMouseOver();
  }
}