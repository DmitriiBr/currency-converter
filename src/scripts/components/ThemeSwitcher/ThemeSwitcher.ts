import { RenderElement } from '../../Main/RenderElement';

export class ThemeSwitcher {
  private mainClass = 'theme-switcher';

  render() {
    const checkbox = new RenderElement({
      tagName: 'input',
      className: `${this.mainClass}__checkbox`,
      attributes: {
        type: 'checkbox',
      },
      actions: {
        change: this.handleSwitchTheme,
      },
    });

    const checkmark = new RenderElement({
      tagName: 'span',
      className: `${this.mainClass}__checkmark`,
    });

    const label = new RenderElement({
      tagName: 'label',
      className: this.mainClass,
      inner: [checkbox.render(), checkmark.render()],
    });

    return label.render();
  }

  handleSwitchTheme(e?: Event, element?: Element) {
    if (element instanceof HTMLInputElement) {
      if (element.checked) {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }
    }
  }
}
