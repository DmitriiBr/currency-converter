import { RenderElement } from '../../Main/RenderElement';
import { Store } from '../../store';
import { getElement } from '../../utils';

export class ConvertionsTitle {
  private mainClass = 'title';
  private titleSpanFrom = `${this.mainClass}__span-from`;
  private titleSpanTo = `${this.mainClass}__span-to`;

  public render() {
    const storeValues = Store.choosedItemRates;

    const titleElement = new RenderElement({
      tagName: 'h1',
      className: [this.mainClass],
      inner: `
        <span class="${this.titleSpanFrom}">${storeValues[0]}</span> 
          equals to: 
        <span class="${this.titleSpanTo}">${storeValues[1]}</span>
      `,
    });

    return titleElement.render();
  }

  updateTitle() {
    const storeValues = Store.convertedValues;
    const titleSpanFrom = getElement(this.titleSpanFrom);
    const titleSpanTo = getElement(this.titleSpanTo);

    if (titleSpanFrom && titleSpanTo) {
      titleSpanFrom.textContent = storeValues[0].toFixed(2);
      titleSpanTo.textContent = storeValues[1].toFixed(2);
    }
  }

  public getClass() {
    return this.mainClass;
  }
}