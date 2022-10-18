import {
  Inner,
  IElement,
  IActions,
  IDataset,
  IAttributes,
} from '../types/types';

export class RenderElement {
  private tagName: string;
  private className: string[] | string;
  private inner: Inner | undefined;
  private dataset: IDataset | undefined;
  private attributes: IAttributes | undefined;
  private actions: IActions | undefined;

  constructor({
    tagName,
    className,
    inner,
    dataset,
    attributes,
    actions,
  }: IElement) {
    this.tagName = tagName;
    this.className = className;
    this.inner = inner;
    this.dataset = dataset;
    this.attributes = attributes;
    this.actions = actions;
  }

  public render(): HTMLElement {
    const element = document.createElement(this.tagName);

    if (typeof this.className === 'string') {
      element.classList.add(this.className);
    } else {
      element.classList.add(...this.className);
    }

    this.addDataAttributes(element, this.dataset);
    this.addAttributes(element, this.attributes);
    this.appendInner(element, this.inner);
    this.addActions(element, this.actions);

    return element;
  }

  private appendInner(element: Element, inner: Inner | undefined) {
    if (inner) {
      if (typeof inner === 'string') {
        element.innerHTML += inner;
      } else {
        this.inner && element.append(...inner);
      }
    }
  }

  private addActions(element: Element, actions: IActions | undefined) {
    if (actions) {
      Object.keys(actions).forEach((action) => {
        element.addEventListener(action, (e?: Event) => {
          actions[action](e, element);
        });
      });
    }
  }

  private addDataAttributes(element: Element, dataset: IDataset | undefined) {
    if (dataset) {
      for (const key in dataset) {
        element.setAttribute(`data-${key}`, dataset[key]);
      }
    }
  }

  private addAttributes(element: Element, attributes: IAttributes | undefined) {
    if (attributes) {
      for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
      }
    }
  }
}
