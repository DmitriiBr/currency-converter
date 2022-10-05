import { Dropdown } from '.';

export class DropdownBtn extends Dropdown {
  private btnClass: string;

  constructor(btnClass: string) {
    super();
    this.btnClass = btnClass;
  }

  render(mainClass: string): string {
    return `
      <button class="${this.btnClass}">
        <span class="${mainClass}__title">Title</span>
          <span class="${mainClass}__arrow">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
              <path
                d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
      </button>
    `;
  }

  element(): Element | null {
    const btnElement = document.querySelector(`.${this.btnClass}`);
    return btnElement;
  }

  addListenerToggle(toggledElement: Element | null, toggledClass: string): void {
    this.element()?.addEventListener('click', () => toggledElement?.classList.toggle(toggledClass));
  }
}