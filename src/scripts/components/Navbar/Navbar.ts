import { RenderElement } from '../../Main/RenderElement';
import { NavbarMenu } from './NavbarMenu';

export class Navbar {
  private mainClass = 'navbar';

  render() {
    const menu = new NavbarMenu(this.mainClass);

    const navbarElement = new RenderElement({
      tagName: 'nav',
      className: this.mainClass,
      inner: [menu.render()],
    });

    return navbarElement.render();
  }
}
