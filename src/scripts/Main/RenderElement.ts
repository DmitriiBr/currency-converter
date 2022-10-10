interface IDataset {
  [key: string]: string
}

export interface IElement {
  tagName: string
  className: string[]
  inner: string[] | string
  dataset?: IDataset
}

export class RenderElement {
  private tagName: string;
  private className: string[];
  private inner: string[] | string;
  private dataset: IDataset | undefined;

  constructor({ tagName, className, inner, dataset }: IElement) {
    this.tagName = tagName;
    this.className = className;
    this.inner = inner;
    this.dataset = dataset;
  }

  render(): string {
    const classNames = this.className.join(' ').replace(',', '');
    const innerStringified = Array.isArray(this.inner) ? this.inner.join('').replace(',', '') : this.inner;
    const dataAttributes = this.dataset
      ? Object.entries(this.dataset).map(elem => `data-${elem[0]}="${elem[1]}"`).join(' ')
      : null;

    const markup = `
      <${this.tagName} class="${classNames}" ${dataAttributes}>
        ${innerStringified}
      </${this.tagName}>
    `;

    return markup;
  }
}