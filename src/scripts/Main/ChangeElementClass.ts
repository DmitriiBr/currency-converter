import { getAllElements } from './GetElement';

export interface IChangableElementByClass {
  elementClassName: string
  changableClassName: string
  index: number
  all?: boolean
}

export const classAdd = ({ elementClassName, changableClassName, index, all }: IChangableElementByClass): void => {
  if (all) {
    getAllElements(elementClassName).forEach((_, index) => classAdd({ elementClassName, changableClassName, index }));
  }

  getAllElements(elementClassName)[index].classList.add(changableClassName);
};

export const classRemove = ({ elementClassName, changableClassName, index, all }: IChangableElementByClass): void => {
  if (all) {
    getAllElements(elementClassName).forEach((_, index) => classRemove({ elementClassName, changableClassName, index }));
  }

  getAllElements(elementClassName)[index].classList.remove(changableClassName);
};