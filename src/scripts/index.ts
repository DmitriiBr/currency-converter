import '../styles/index.scss';
import { MainCurrencyInput } from './components/CurrencyInput';
import { Dropdown } from './components/Dropdown/Dropdown';


// TODO:
// Create app class [+]
// insert in app render input and dropdown [+]

// TODO:
// Need some unique id-s to separate elements from each other`
// Refactoring to all class elements to use them undependful from each other
// Style corrections
// SCSS corrections to global properties
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
  }
}

const main = document.querySelector('.main');
const app = new App();

main?.insertAdjacentHTML('afterbegin', app.render());

app.addListeners();