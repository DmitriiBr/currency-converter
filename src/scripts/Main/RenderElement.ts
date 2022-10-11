interface IDataset {
  [key: string]: string
}

interface IActions {
  [key: string]: () => void;
}

export interface IElement {
  tagName: string
  className: string[]
  inner?: Node[] | string
  type?: string
  dataset?: IDataset
  actions?: IActions
}

export class RenderElementNew {
  private tagName: string;
  private className: string[];
  private inner: Node[] | string | undefined;
  private dataset: IDataset | undefined;
  private actions: IActions | undefined;
  private type: string | undefined;

  constructor({ tagName, className, inner, type, dataset, actions }: IElement) {
    this.tagName = tagName;
    this.className = className;
    this.inner = inner;
    this.type = type;
    this.dataset = dataset;
    this.actions = actions;
  }

  render(): Node {
    const element = document.createElement(this.tagName);
    element.classList.add(...this.className);
    element.setAttribute('type', this.type || '');

    for (const key in this.dataset) {
      element.setAttribute(`data-${key}`, this.dataset[key]);
    }

    if (typeof this.inner === 'string') {
      element.append(this.inner);
    } else {
      this.inner && element.append(...this.inner);
    }

    if (this.actions) {
      Object.keys(this.actions).forEach(action => {
        if (this.actions) {
          element.addEventListener(action, this.actions[action]);
        }
      });
    }

    return element;
  }
}