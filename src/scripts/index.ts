import '../styles/index.scss';
import { getRatesData } from './api/rates';
import { Container } from './components/Container/Container';
import { ConvertionsTitle } from './components/ConvertionsTitle/ConvertionsTitle';
import { Navbar } from './components/Navbar/Navbar';
import { RenderElement } from './Main/RenderElement';

class App {
  private appClass = 'app';
  private convertionsTitlte = new ConvertionsTitle();
  private navbar = new Navbar();
  private container = new Container('container');

  public render() {
    const element = new RenderElement({
      tagName: 'div',
      className: [this.appClass],
      inner: [
        this.navbar.render(),
        this.convertionsTitlte.render(),
        this.container.render(),
      ],
    });

    return element.render();
  }
}

const main = document.querySelector('.main');
const app = new App();

const init = async () => {
  try {
    await getRatesData();

    if (app) {
      main?.append(app.render() || 'not appended mistake');
    }
  } catch (e) {
    const result = (e as Error).message;

    main?.append('Hello world');

    throw new Error(result);
  }
};

init();
