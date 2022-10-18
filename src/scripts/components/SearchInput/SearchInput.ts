import { RenderElement } from '../../Main/RenderElement';
import { IListItemObject } from '../../types/types';
import { getAllElements } from '../../utils';

export class SearchInput {
  private mainClass: string;
  private inputFieldClass: string;

  constructor(mainClass: string) {
    this.mainClass = mainClass;
    this.inputFieldClass = `${mainClass}__field`;
  }

  public render(dropdownID: number, listItems: IListItemObject[]) {
    const searchInputElement = new RenderElement({
      tagName: 'input',
      className: [
        this.mainClass,
        this.inputFieldClass,
        `${this.inputFieldClass}--search`,
      ],
      dataset: {
        'search-input-id': String(dropdownID),
      },
      attributes: {
        type: 'search',
        placeholder: 'search...',
      },
      actions: {
        input: this.handleSearch(listItems),
      },
    });

    return searchInputElement.render();
  }

  handleSearch(listItems: IListItemObject[]) {
    return (e?: Event, element?: Element) => {
      if (e) {
        const { target } = e;

        if (target instanceof HTMLInputElement) {
          const value = target.value.toLowerCase();

          listItems.forEach(({ code, name, element }) => {
            const isVisible =
              name.toLowerCase().includes(value) ||
              code.toLowerCase().includes(value);

            element.classList.toggle('hide', !isVisible);
          });

          listItems
            .filter(({ element }) => !element.classList.contains('hide'))
            .forEach(({ element }, index) => {
              element.dataset.translateValue = `${(index + 1) * 100}%`;
            });
        }
      }
    };
  }

  resetValue(listItemClass: string) {
    const searchInputs = getAllElements(`${this.inputFieldClass}--search`);
    const listItems = getAllElements(listItemClass);

    listItems.forEach((item, index) => {
      item.classList.remove('hide');

      if (item instanceof HTMLElement) {
        item.dataset.translateValue = `${(index + 1) * 100}%`;
      }
    });

    searchInputs.forEach((elem) => {
      if (elem instanceof HTMLInputElement) elem.value = '';
    });
  }

  public getClass() {
    return this.mainClass;
  }
}
