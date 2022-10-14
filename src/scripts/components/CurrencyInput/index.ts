import { getAllElements } from '../../utils';
import { RenderElement } from '../../Main/RenderElement';
import { Store } from '../../store';
import { ConvertionsTitle } from '../ConvertionsTitle/ConvertionsTitle';

let inputID = -1;

export class MainCurrencyInput {
  private mainClass: string | undefined;
  private inputFieldClass: string;

  constructor(mainClass?: string) {
    this.mainClass = mainClass;
    this.inputFieldClass = `${mainClass}__field`;
  }

  getClass() {
    return this.inputFieldClass;
  }

  render(): Node {
    inputID++;

    const input = new RenderElement({
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

    const inputWrapper = new RenderElement({
      tagName: 'div',
      className: [`${this.mainClass}__wrapper`],
      inner: [input.render()]
    });

    return inputWrapper.render();
  }

  handleConvert(inputID: number) {
    const convertionsTitlte = new ConvertionsTitle();

    return (e?: Event, element?: Element): void => {
      if (element instanceof HTMLInputElement) {
        Store.choosedItemValues[inputID] = Number(element.value);

        const value = Store.choosedItemValues[inputID];
        const rate = Store.choosedItemRates[inputID];
        const fullValue = (value / rate).toFixed(2);

        const allInputElements = getAllElements(this.inputFieldClass);

        if (Number(fullValue) !== Infinity) Store.fullValues[inputID] = Number(fullValue);

        Store.fullValues.forEach((val, i) => {
          const exactInput: HTMLInputElement | Element = allInputElements[i];

          if (exactInput instanceof HTMLInputElement) {
            if (i === inputID) {
              Store.convertedValues[inputID] = value;
            } else {
              const convertedValue = Store.choosedItemRates[i] / rate;

              if (convertedValue && convertedValue !== Infinity) {
                Store.convertedValues[i] = convertedValue * value;
                exactInput.value = Store.convertedValues[i].toFixed(2);
              }
            }
          }
        });
        convertionsTitlte.updateTitle();
      }
    };
  }
}