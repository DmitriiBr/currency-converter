import '../styles/index.scss';
import { ConvertionsTitle } from './components/ConvertionsTitle/ConvertionsTitle';
import { Input } from './components/CurrencyInput';
import { Dropdown } from './components/Dropdown/Dropdown';
import { Navbar } from './components/Navbar/Navbar';
import { RenderElement } from './Main/RenderElement';

// TODO:
// Fix bug with translate values and overflow
// Fetch data to finalaly complete tast
// Connect fethed data to localstorage
// Create local storage cahe to start at the same points
// Idea is to prefill Store with local storage data
// Mb some components refactoring

class App {
  private appClass = 'app';
  private dropdown = new Dropdown('dropdown');
  private currencyInput = new Input('input');
  private convertionsTitlte = new ConvertionsTitle();
  private navbar = new Navbar();

  public render() {
    const convertFrom = new RenderElement({
      tagName: 'div',
      className: ['container__convert-from'],
      inner: [this.currencyInput.render(), this.dropdown.render()],
    });

    const convertTo = new RenderElement({
      tagName: 'div',
      className: ['container__convert-to'],
      inner: [this.currencyInput.render(), this.dropdown.render()],
    });

    const container = new RenderElement({
      tagName: 'div',
      className: ['container'],
      inner: [convertFrom.render(), convertTo.render()],
    });

    const element = new RenderElement({
      tagName: 'div',
      className: [this.appClass],
      inner: [
        this.navbar.render(),
        this.convertionsTitlte.render(),
        container.render(),
      ],
    });

    return element.render();
  }
}

const main = document.querySelector('.main');
const app = new App();

if (app) {
  main?.append(app.render() || 'not appended mistake');
}
