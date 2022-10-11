import { RenderElementNew } from '../../Main/RenderElement';
import { DropdownBtn } from './DropdownBtn';
import { DropdownList } from './DropdownList';

export let dropdownID = -1;

export class Dropdown {
  public mainClass: string;

  constructor(mainClass: string) {
    this.mainClass = mainClass;
  }

  public render() {
    const btn = new DropdownBtn(this.mainClass);
    const list = new DropdownList(this.mainClass);

    dropdownID++;

    const element = new RenderElementNew({
      tagName: 'div',
      className: [this.mainClass, `${this.mainClass}--id_${dropdownID}`],
      inner: [btn.render(), list.render()]
    });

    return element.render();
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