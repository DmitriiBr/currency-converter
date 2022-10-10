import { RenderElement } from '../../Main/RenderElement';
import { DropdownBtn } from './DropdownBtn';
import { DropdownList } from './DropdownList';

export let dropdownID = -1;

export class Dropdown {
  public mainClass: string;
  constructor(mainClass: string) {
    this.mainClass = mainClass;
  }

  public render() {
    if (this.mainClass) {
      const list = new DropdownList(this.mainClass);
      const btn = new DropdownBtn(this.mainClass);

      dropdownID++;

      const element = new RenderElement({
        tagName: 'div',
        className: [this.mainClass, `${this.mainClass}--id_${dropdownID}`],
        inner: [btn.render(), list.render()]
      });

      return element.render();
    } else {
      throw new Error('Not main class inside dropdown');
    }
  }

  addListeners() {
    if (this.mainClass) {
      const list = new DropdownList(this.mainClass);
      const btn = new DropdownBtn(this.mainClass);
      btn.addListenerToggle();
      list.addAllListeners();
    } else {
      throw new Error('No main class inside addListeners');
    }
  }
}