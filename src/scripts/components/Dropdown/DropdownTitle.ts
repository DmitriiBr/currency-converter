import { MainDropdown } from '.';

export class DropdownTitle extends MainDropdown {
  private titleClass: string | undefined;

  constructor(mainClass?: string) {
    super(mainClass);
    this.titleClass = `${mainClass}__title`;
  }

  render() {
    return `
      <span class="${this.titleClass}">Text</span>
    `;
  }

  elements(i = 0) {
    const titleELements = document.querySelectorAll(`.${this.titleClass}`);
    return titleELements[i];
  }
}