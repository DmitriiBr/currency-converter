import { RenderElement } from '../../Main/RenderElement';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import { MenuItem } from './MenuItem';

export class NavbarMenu {
  private menuClass: string;

  constructor(mainClass: string) {
    this.menuClass = `${mainClass}__menu`;
  }

  render() {
    const menuItem = new MenuItem(this.menuClass);
    const themeSwitcher = new ThemeSwitcher();
    const menuData = ['Currency converter', [themeSwitcher.render()]];

    const menuElement = new RenderElement({
      tagName: 'ul',
      className: this.menuClass,
      inner: menuData.map((item) => menuItem.render(item)),
    });

    return menuElement.render();
  }
}
