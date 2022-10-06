import { MainDropdown } from '.';
import { DropdownBtn } from './DropdownBtn';
import { DropdownList } from './DropdownList';

export class Dropdown extends MainDropdown {
  private list;
  private btn;

  constructor(mainClass: string) {
    super(mainClass);
    this.mainClass = mainClass;
    this.list = new DropdownList(this.mainClass);
    this.btn = new DropdownBtn(this.mainClass);
  }

  public renderDropdown() {
    return `
      <div class="${this.mainClass}">
        ${this.btn.render()}
        ${this.list.render()}
      </div>
    `;
  }

  addListeners() {
    this.btn.addListenerToggle();
    this.list.addAllListeners();
  }
}