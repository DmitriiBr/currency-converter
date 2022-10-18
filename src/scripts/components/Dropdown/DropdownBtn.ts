import { DropdownTitle } from './DropdownTitle';
import { DropdownList } from './DropdownList';
import { dropdownID } from './Dropdown';
import { RenderElement } from '../../Main/RenderElement';

export class DropdownBtn {
  private btnClass: string;
  private mainClass: string;

  constructor(mainClass: string) {
    this.btnClass = `${mainClass}__btn`;
    this.mainClass = mainClass;
  }

  render(): Node {
    const title = new DropdownTitle(this.mainClass).render();
    // const arrow = new DropdownArrow(this.mainClass);

    const element = new RenderElement({
      tagName: 'button',
      className: [this.btnClass, `${this.btnClass}--id_${dropdownID}`],
      inner: [title],
      actions: {
        click: this.handleToggle(dropdownID),
      },
    });

    return element.render();
  }

  handleToggle(index: number) {
    const dropdownList = new DropdownList(this.mainClass);

    return (e?: Event) => {
      dropdownList.toggleList(index);
    };
  }
}
