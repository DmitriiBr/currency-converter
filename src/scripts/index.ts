import '../styles/index.scss';
import { MainCurrencyInput } from './components/CurrencyInput';
import { Dropdown } from './components/Dropdown/Dropdown';
import { RenderElement } from './Main/RenderElement';

// TODO:
// Try to implement input functional to the App

// TODO:
// Try to implement sccrolling into dropdown menu with overflow
// Currency converting functional insite inputs
// Styles refactoring
// Create dropdown map with russian currency names

class App {
  private appClass = 'app';
  private dropdown = new Dropdown('dropdown');
  private currencyInput = new MainCurrencyInput('input');

  public render() {
    const convertFrom = new RenderElement({
      tagName: 'div',
      className: ['container', 'container__convert-from'],
      inner: [this.dropdown.render(), this.currencyInput.render()]
    });

    const convertTo = new RenderElement({
      tagName: 'div',
      className: ['container', 'container__convert-to'],
      inner: [this.dropdown.render(), this.currencyInput.render()]
    });

    return `
      <div class="${this.appClass}">
        ${convertFrom.render()}
        ${convertTo.render()}
      </div>
    `;
  }

  public addListeners() {
    this.dropdown.addListeners();
    this.currencyInput.addListenerConvert();
  }
}

const main = document.querySelector('.main');
const app = new App();

main?.insertAdjacentHTML('afterbegin', app.render());

app.addListeners();