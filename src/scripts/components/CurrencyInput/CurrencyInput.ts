import { getAllElements, fixValue } from '../../utils';
import { RenderElement } from '../../Main/RenderElement';
import { dispatchStore, getValueFromStore } from '../../store';

let inputID = -1;

export class Input {
  private mainClass: string;
  private inputFieldClass: string;
  private currencyInputClass: string;

  constructor(mainClass: string) {
    this.mainClass = mainClass;
    this.inputFieldClass = `${mainClass}__field`;
    this.currencyInputClass = `${this.inputFieldClass}--currency`;
  }

  public getClass() {
    return this.currencyInputClass;
  }

  public render(): Node {
    inputID++;

    const input = new RenderElement({
      tagName: 'input',
      className: [
        this.mainClass,
        this.inputFieldClass,
        this.currencyInputClass,
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
      const inputValue = Number((element as HTMLInputElement).value);
      const allInputElements = getAllElements(this.currencyInputClass);

      dispatchStore('choosedItemValues', inputID, inputValue);

      const value = getValueFromStore('choosedItemValues', inputID);
      const rate = getValueFromStore('choosedItemRates', inputID);

      allInputElements.forEach((elem, i) => {
        if (i === inputID) {
          dispatchStore('choosedItemValues', i, value);
        } else {
          const finalRate =
            Number(getValueFromStore('choosedItemRates', i)) / Number(rate);

          if (finalRate && finalRate !== Infinity) {
            dispatchStore('choosedItemValues', i, finalRate * Number(value));

            const storeValue = Number(
              getValueFromStore('choosedItemValues', i)
            );

            (elem as HTMLInputElement).value =
              storeValue === 0 ? '' : fixValue(storeValue);
          }
        }
      });
    };
  }
}
