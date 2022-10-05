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
    return `
      <div class="${this.mainClass}">
        ${this.btn.render(this.mainClass || 'dropdown')}
        ${this.list.render()}
      </div>
    `;
  }

  addListeners() {
    this.btn.addListenerToggle(this.list.element(), 'dropdown__list--show');
    this.list.addListenerMouseOver();
    this.list.addListenerItemChoose();
  }
}