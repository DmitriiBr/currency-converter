import { DropdownTitle } from './DropdownTitle';
import { DropdownArrow } from './DropdownArrow';
import { DropdownList } from './DropdownList';
import { dropdownID } from './Dropdown';
import { RenderElement } from '../../Main/RenderElement';
import { getAllElements } from '../../Main/GetElement';


export class DropdownBtn {
  private btnClass: string;
  private mainClass: string;

  constructor(mainClass: string) {
    this.btnClass = `${mainClass}__btn`;
    this.mainClass = mainClass;
  }

  render(): string {
    const title = new DropdownTitle(this.mainClass);
    const arrow = new DropdownArrow(this.mainClass);

    const element = new RenderElement({
      tagName: 'button',
      className: [`${this.btnClass}, ${this.btnClass}--id_${dropdownID}`],
      inner: [title.render(), arrow.render()]
    });

    return element.render();
  }

  addListenerToggle(): void {
    const dropdownList = new DropdownList(this.mainClass);
    const btnElements: NodeListOf<Element> = getAllElements(this.btnClass);

    btnElements.forEach((elem, index) => {
      elem.addEventListener('click', () => {
        dropdownList.toggleList(index);
      });
    });
  }
}

