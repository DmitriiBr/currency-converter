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
      Store.choosedItemValues[inputID] = Number(
        (element as HTMLInputElement).value
      );

      const allInputElements = getAllElements(
        `${this.inputFieldClass}--currency`
      );
      const value = Store.choosedItemValues[inputID];
      const rate = Store.choosedItemRates[inputID];

      Store.convertedValues.forEach((storeValue, i) => {
        const exactInput = allInputElements[i];

        if (i === inputID) {
          storeValue = value;
        } else {
          const finalRate = Store.choosedItemRates[i] / rate;

          if (finalRate && finalRate !== Infinity) {
            storeValue = finalRate * value;
            (exactInput as HTMLInputElement).value =
              storeValue === 0 ? '' : fixValue(storeValue);
          }
        }
      });
    };
  }
}
