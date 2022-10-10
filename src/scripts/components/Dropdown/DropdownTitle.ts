import { dropdownID } from './Dropdown';

export class DropdownTitle {
  private titleClass: string | undefined;

  constructor(mainClass?: string) {
    this.titleClass = `${mainClass}__title`;
  }

  render() {
    return `
      <span class="${this.titleClass} ${this.titleClass}--id_${dropdownID}"
        data-dropdown-title-id="${dropdownID}"
      >
        Text
      </span>
    `;
  }

  elements(i = 0) {
    const titleELements = document.querySelectorAll(`.${this.titleClass}`);
    return titleELements[i];
  }
}