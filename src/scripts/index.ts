import '../styles/index.scss';
import { MainCurrencyInput } from './components/CurrencyInput';
import { Dropdown } from './components/Dropdown/Dropdown';

// Elements
// TODO:
// Rename dropdown calsses main and dropdown controller [+]
// Type guards for dropdown class [+]
// Dropdown choosing items functional [+]
// Show choosed item inside button title [+]
// Style dropdown [+]
// Animation to dropdown list [+]

// TODO:
// Create app class
// insert in app render input and dropdown

class App {
  private appClass = 'app';
  private dropdown = new Dropdown('dropdown');
  private currencyInput = new MainCurrencyInput('input');

  render() {
    return `
      <div class="${this.appClass}">
        <div>
          ${this.dropdown.renderDropdown()}
          ${this.currencyInput.render()}
        </div>
        <div>
          ${this.dropdown.renderDropdown()}
          ${this.currencyInput.render()}
        </div>
      </div>
    `;
  }

  addListeners() {
    this.dropdown.addListeners();
  }
}

const main = document.querySelector('.main');
const app = new App();

main?.insertAdjacentHTML('afterbegin', app.render());

app.addListeners();