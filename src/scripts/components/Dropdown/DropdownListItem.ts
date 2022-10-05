import { IDropdownListItem } from '../../data/types';
import { Dropdown } from '.';

export class DropdownListItem extends Dropdown {

  render({ text, index }: IDropdownListItem, listClass: string): string {
    return `
      <li class="${listClass}--item" data-translate-value="${index}%">
        ${text}
      </li>
    `;
  }
}