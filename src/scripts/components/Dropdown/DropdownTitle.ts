import { RenderElement } from '../../Main/RenderElement';
import { dropdownID } from './Dropdown';

export class DropdownTitle {
  private titleClass: string;

  constructor(mainClass?: string) {
    this.titleClass = `${mainClass}__title`;
  }

  getClass() {
    return this.titleClass;
  }

  render(): Node {
    const element = new RenderElement({
      tagName: 'span',
      className: [this.titleClass, `${this.titleClass}--id_${dropdownID}`],
      inner: 'Choose currency',
      dataset: {
        'dropdown-title-id': String(dropdownID)
      }
    });

    return element.render();
  }
}