import { currencyRates } from '../../data';
import { RenderElementNew } from '../../Main/RenderElement';

let inputID = -1;

export class MainCurrencyInput {
  protected mainClass: string;

  constructor(mainClass: string) {
    this.mainClass = mainClass;
  }

  render(): Node {
    inputID++;
    const input = new RenderElementNew({
      tagName: 'input',
      type: 'number',
      className: [
        `${this.mainClass}__field`,
        `${this.mainClass}__field--currency`,
        `${this.mainClass}__field--id_${inputID}`
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

  elements(): NodeListOf<HTMLInputElement> {
    const inputElements = document.querySelectorAll(`.${this.mainClass}__field`);
    return (inputElements as NodeListOf<HTMLInputElement>);
  }

  // Create convert functional to inputs bm 2 - 3 methods more
  // Self
  addListenerConvert() {
    const inputElements = this.elements();
    console.log(currencyRates);

    inputElements.forEach(<T extends HTMLInputElement>(elem: T) => {
      elem.addEventListener('input', <U extends Event>(e: U) => {
        const { target } = e;

        if (target instanceof HTMLElement) {
          console.log(target.dataset.inputId);
        }
      });
    });
    return 0;
  }
}