interface IDataset {
  [key: string | number]: string;
}

interface IActions {
  [key: string]: (e?: Event, element?: Element) => void;
}

interface IAttributes {
  [key: string | number]: string;
}

type Inner = Node[] | string;

export interface IElement {
  tagName: string
  className: string[]
  inner?: Inner
  type?: string
  dataset?: IDataset
  attributes?: IAttributes
  actions?: IActions
}

export class RenderElementNew {
  private tagName: string;
  private className: string[];
  private inner: Inner | undefined;
  private dataset: IDataset | undefined;
  private type: string | undefined;
  private attributes: IAttributes | undefined;
  private actions: IActions | undefined;

  constructor({ tagName, className, inner, type, dataset, attributes, actions }: IElement) {
    this.tagName = tagName;
    this.className = className;
    this.inner = inner;
    this.type = type;
    this.dataset = dataset;
    this.attributes = attributes;
    this.actions = actions;
  }

  public render(): Node {
    const element = document.createElement(this.tagName);

    element.classList.add(...this.className);
    element.setAttribute('type', this.type || '');

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

  // Adding eventlistener by adding handle function to element
  // Itereting through actions array and every action
  private addActions(element: Element, actions: IActions | undefined) {
    if (actions) {
      Object.keys(actions).forEach(action => {
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