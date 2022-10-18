import { RenderElement } from '../../Main/RenderElement';
import { Dropdown } from '../Dropdown/Dropdown';
import { Input } from '../CurrencyInput/CurrencyInput';

export class Container {
  private mainClass: string;
  private dropdown = new Dropdown('dropdown');
  private currencyInput = new Input('input');

  constructor(mainClass: string) {
    this.mainClass = mainClass;
  }

  render(): HTMLElement {
    const convertFrom = new RenderElement({
      tagName: 'div',
      className: `${this.mainClass}__convert-from`,
      inner: [this.currencyInput.render(), this.dropdown.render()],
    });

    const convertTo = new RenderElement({
      tagName: 'div',
      className: `${this.mainClass}__convert-to`,
      inner: [this.currencyInput.render(), this.dropdown.render()],
    });

    const containerElement = new RenderElement({
      tagName: 'div',
      className: this.mainClass,
      inner: [convertFrom.render(), convertTo.render()],
    });

    return containerElement.render();
  }
}
