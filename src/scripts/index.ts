import '../styles/index.scss';
import { MainCurrencyInput } from './components/CurrencyInput';
import { Dropdown } from './components/Dropdown/Dropdown';
import { RenderElementNew } from './Main/RenderElement';

class App {
  private appClass = 'app';
  private dropdown = new Dropdown('dropdown');
  private currencyInput = new MainCurrencyInput('input');

  public render() {
    const convertFrom = new RenderElementNew({
      tagName: 'div',
      className: ['container', 'container__convert-from'],
      inner: [this.dropdown.render(), this.currencyInput.render()]
    });

    const convertTo = new RenderElementNew({
      tagName: 'div',
      className: ['container', 'container__convert-to'],
      inner: [this.dropdown.render(), this.currencyInput.render()]
    });

    const element = new RenderElementNew({
      tagName: 'div',
      className: [this.appClass],
      inner: [convertFrom.render(), convertTo.render()]
    });

    return element.render();
  }
}

const main = document.querySelector('.main');
const app = new App();

if (app) {
  main?.append(app.render() || 'not appended mistake');
}
