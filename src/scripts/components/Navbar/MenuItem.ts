import { RenderElement } from '../../Main/RenderElement';
import { Inner } from '../../types/types';

export class MenuItem {
  private menuItemClass: string;

  constructor(menuClass: string) {
    this.menuItemClass = `${menuClass}--item`;
  }

  render(inner: Inner | undefined) {
    const menuItemElement = new RenderElement({
      tagName: 'li',
      className: [this.menuItemClass],
      inner: inner,
    });

    return menuItemElement.render();
  }
}
