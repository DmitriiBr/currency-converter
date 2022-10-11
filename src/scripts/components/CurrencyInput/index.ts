// import { currencyRates } from '../../data';
import { getAllElements } from '../../Main/GetElement';
import { RenderElementNew } from '../../Main/RenderElement';
import { Store } from '../../store';
import { currencyRatesToArray } from '../../utils';

let inputID = -1;

const convertCurrencies = (from: number, to: number): number => {
  const result = to / from;
  return result;
};

export class MainCurrencyInput {
  private mainClass: string;
  private inputFieldClass: string;

  constructor(mainClass: string) {
    this.mainClass = mainClass;
    this.inputFieldClass = `${mainClass}__field`;
  }

  render(): Node {
    inputID++;
    const input = new RenderElementNew({
      tagName: 'input',
      type: 'number',
      className: [
        this.inputFieldClass,
        `${this.inputFieldClass}--currency`,
        `${this.inputFieldClass}--id_${inputID}`
      ],
      dataset: {
        'input-id': String(inputID)
      }
    });

    const element = new RenderElementNew({
      tagName: 'div',
      className: [`${this.mainClass}__wrapper`],
      inner: [input.render()]
    });

    return element.render();
  }

  // Convert functional
  // 
  addListenerConvert() {
    const allInputElements: NodeListOf<Element> = getAllElements(this.inputFieldClass);

    allInputElements.forEach(<T extends Element>(elem: T) => {
      elem.addEventListener('input', <U extends Event>(e: U): void => {
        const { target } = e;

        if (target instanceof HTMLElement) {
          console.log(Store.choosedItemID, Store.choosedItemName);
        }
      });
    });
  }

  // Refactor this basic convert to ability for expanding functional
  // It must be converting to any side
  addListenerBasicConvert() {
    const allInputElements: NodeListOf<Element> = getAllElements(this.inputFieldClass);
    const data = currencyRatesToArray();

    if (allInputElements) {
      allInputElements[0].addEventListener('input', () => {
        if (allInputElements[1] instanceof HTMLInputElement && allInputElements[0] instanceof HTMLInputElement) {
          allInputElements[1].value = Number(String(convertCurrencies(
            data[Store.choosedItemID[0]][1],
            data[Store.choosedItemID[1]][1],
          ) * Number(allInputElements[0].value))).toFixed(2);
        }
      });
    }
  }
}