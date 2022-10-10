import { dropdownID } from './Dropdown';

export class DropdownArrow {
  private arrowClass: string;

  constructor(mainClass: string) {
    this.arrowClass = `${mainClass}__arrow`;
  }

  render() {
    return `
      <span class="${this.arrowClass} ${this.arrowClass}--id_${dropdownID}">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <path
            d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" 
          />
        </svg>
      </span>
    `;
  }
}