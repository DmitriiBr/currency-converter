import { currencyRates } from '../../data';
let inputID = -1;

export class MainCurrencyInput {
  protected mainClass: string;

  constructor(mainClass: string) {
    this.mainClass = mainClass;
  }

  render() {
    inputID++;
    return `
      <div class="${this.mainClass}__wrapper">
        <input 
          type="number" 
          class="${this.mainClass}__field 
          ${this.mainClass}__field--currency ${this.mainClass}__field--id_${inputID}"
          data-input-id="${inputID}"
        >
      </div>
    `;
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