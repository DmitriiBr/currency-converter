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

          listItems.forEach((item, index) => {
            const isVisible =
              item.name.toLowerCase().includes(value) ||
              item.code.toLocaleLowerCase().includes(value);

            if (item.element instanceof HTMLElement) {
              item.element.classList.toggle('hide', !isVisible);
            }
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
        item.dataset.translateValue = String((index + 1) * 100) + '%';
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
