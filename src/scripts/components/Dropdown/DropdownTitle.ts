import { RenderElementNew } from '../../Main/RenderElement';
import { dropdownID } from './Dropdown';

export class DropdownTitle {
  private titleClass: string;

  constructor(mainClass?: string) {
    this.titleClass = `${mainClass}__title`;
  }

  render(): Node {
    const element = new RenderElementNew({
      tagName: 'span',
      className: [this.titleClass, `${this.titleClass}--id_${dropdownID}`],
      inner: 'Choose currency',
      dataset: {
        'dropdown-title-id': String(dropdownID)
      }
    });

    return element.render();
  }

  elements(i = 0) {
    const titleELements = document.querySelectorAll(`.${this.titleClass}`);
    return titleELements[i];
  }

  getClass() {
    return this.titleClass;
  }
}