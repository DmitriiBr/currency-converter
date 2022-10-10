import '../styles/index.scss';
import { MainCurrencyInput } from './components/CurrencyInput';
import { Dropdown } from './components/Dropdown/Dropdown';



// TODO:
// Try to implement input functional to the App

class App {
  private appClass = 'app';
  private dropdown = new Dropdown('dropdown');
  private currencyInput = new MainCurrencyInput('input');

  public render() {
    return `
      <div class="${this.appClass}">
        <div>
          ${this.dropdown.render()}
          ${this.currencyInput.render()}
        </div>
        <div>
          ${this.dropdown.render()}
          ${this.currencyInput.render()}
        </div>
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