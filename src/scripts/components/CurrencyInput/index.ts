import { getAllElements, fixValue } from '../../utils';
import { RenderElement } from '../../Main/RenderElement';
import { Store } from '../../store';

let inputID = -1;

export class Input {
  private mainClass: string;
  private inputFieldClass: string;

  constructor(mainClass: string) {
    this.mainClass = mainClass;
    this.inputFieldClass = `${mainClass}__field`;
  }

  public getClass() {
    return this.inputFieldClass;
  }

  public render(): Node {
    inputID++;

    const input = new RenderElement({
      tagName: 'input',
      className: [
        this.mainClass,
        this.inputFieldClass,
        `${this.inputFieldClass}--currency`,
      ],
      dataset: {
        'input-id': String(inputID),
      },
      actions: {
        input: this.handleConvert(inputID),
      },
      attributes: {
        type: 'number',
      },
    });

    const inputWrapper = new RenderElement({
      tagName: 'div',
      className: [`${this.mainClass}__wrapper`],
      inner: [input.render()],
    });

    return inputWrapper.render();
  }

  handleConvert(inputID: number) {
    return (e?: Event, element?: Element): void => {
      if (element instanceof HTMLInputElement) {
        Store.choosedItemValues[inputID] = Number(element.value);

        const allInputElements = getAllElements(
          `${this.inputFieldClass}--currency`
        );
        const value = Store.choosedItemValues[inputID];
        const rate = Store.choosedItemRates[inputID];

        Store.convertedValues.forEach((storeValue, i) => {
          const exactInput: HTMLInputElement | Element = allInputElements[i];

          if (exactInput instanceof HTMLInputElement) {
            if (i === inputID) {
              storeValue = value;
            } else {
              const finalRate = Store.choosedItemRates[i] / rate;

              if (finalRate && finalRate !== Infinity) {
                storeValue = finalRate * value;
                exactInput.value = storeValue === 0 ? '' : fixValue(storeValue);
              }
            }
          }
        });
      }
    };
  }
}
