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
      },
      actions: {
        input: this.handleConvert(inputID)
      }
    });

    const inputWrapper = new RenderElementNew({
      tagName: 'div',
      className: [`${this.mainClass}__wrapper`],
      inner: [input.render()]
    });

    return inputWrapper.render();
  }

  handleConvert(inputID: number) {
    return (e?: Event, element?: Element) => {
      if (element instanceof HTMLInputElement) {
        Store.choosedItemValues[inputID] = Number(element.value);

        const value = Store.choosedItemValues[inputID];
        const rate = Store.choosedItemRates[inputID];
        const fullValue = (value / rate).toFixed(2);

        Store.fullValues[inputID] = Number(fullValue);

        Store.fullValues.forEach((val, i) => {
          const elem: HTMLInputElement | Element = getAllElements(this.inputFieldClass)[i];

          if (elem instanceof HTMLInputElement) {
            if (i === inputID) {
              Store.convertedValues[i] = value;
              elem.value = String(value);
            } else {
              const convertedValue = Store.choosedItemRates[i] / rate;
              Store.convertedValues[i] = convertedValue * (value);
              elem.value = Store.convertedValues[i].toFixed(2);
            }
          }
        });
      }
    };
  }
}