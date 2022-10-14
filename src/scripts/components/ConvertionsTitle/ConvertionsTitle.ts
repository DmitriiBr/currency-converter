import { RenderElement } from '../../Main/RenderElement';
import { Store } from '../../store';
import { getAllElements, getElement } from '../../utils';

export class ConvertionsTitle {
  private mainClass = 'title';
  private titleSpanCurrencyName = `${this.mainClass}__span--currency`;
  private titleSpanValue = `${this.mainClass}__span--value`;

  public render() {
    const titleElement = new RenderElement({
      tagName: 'h1',
      className: [this.mainClass],
      inner: `
        <span class="${this.titleSpanValue}"></span>
        &nbsp;
        <span class="${this.titleSpanCurrencyName}"></span>
        &nbsp;equals to:&nbsp; 
        <span class="${this.titleSpanValue}"></span>
        &nbsp;
        <span class="${this.titleSpanCurrencyName}"></span>
      `,
    });

    return titleElement.render();
  }

  updateTitle() {
    const convertedToValue = Store.choosedItemRates[1] / Store.choosedItemRates[0];
    const titleSpansValue = getAllElements(this.titleSpanValue);
    const titleSpansCurrencyNames = getAllElements(this.titleSpanCurrencyName);

    if (titleSpansCurrencyNames && convertedToValue !== Infinity) {
      const nameFrom = Store.currencyNames[0].slice(5, 100);
      const nameTo = Store.currencyNames[1].slice(5, 100);
      const title = getElement(this.mainClass);

      if (nameFrom && nameTo && title) {
        title.classList.remove(`${this.mainClass}--show`);
        new Promise(res => {
          setTimeout(() => {
            title.classList.add(`${this.mainClass}--show`);
            res(1);
          }, 400);
        }).then(() => {
          titleSpansValue[0].textContent = '1';
          titleSpansCurrencyNames[0].textContent = `${nameFrom}`;
          titleSpansValue[1].textContent = convertedToValue.toFixed(2);
          titleSpansCurrencyNames[1].textContent = `${nameTo}`;
        });
      }
    }
  }

  public getClass() {
    return this.mainClass;
  }
}