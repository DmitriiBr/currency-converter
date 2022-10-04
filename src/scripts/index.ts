import '../styles/index.scss';
import { listItemsData } from './data';
import { IDropdownListItem } from './data/types';

// Elements
const root = document.documentElement;
//const dropdown: HTMLDivElement | null = document.querySelector('.dropdown');
const dropdownBtn: HTMLButtonElement | null = document.querySelector('.dropdown__btn');
const dropdownList: HTMLUListElement | null = document.querySelector('.dropdown__list');

const dropdownListItemTemplate = <T extends IDropdownListItem>({ text, index }: T): string => {
  return `
    <li class="dropdown__list--item" data-translate-value="${index}%">${text}</li>
  `;
};

dropdownBtn?.addEventListener('click', () => {
  console.log('clicked');
  dropdownList?.classList.toggle('dropdown__list--show');
});

const renderListItems = (): void => {
  listItemsData.forEach((item: IDropdownListItem) => {
    if (dropdownList !== null) {
      dropdownList.innerHTML += dropdownListItemTemplate({ text: item.text, index: item.index * 100 });
    }
  });
};

dropdownList?.addEventListener('mouseover', (e: MouseEvent) => {
  const { target } = e;
  console.log(target)
  if (target) {
    const translateValue = (target as HTMLElement)?.dataset.translateValue;
    translateValue ? root.style.setProperty('--translate-value', translateValue) : null;
    console.log(root.style.getPropertyValue('--translate-value'));
  }
});

renderListItems();
