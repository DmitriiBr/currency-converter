import { IChangableElementByClass } from '../types/types';
import { getAllElements } from '../utils';

export const classAdd = ({ elementClassName, changableClassName, index, all }: IChangableElementByClass): void => {
  if (all) {
    getAllElements(elementClassName).forEach((_, index) =>
      classAdd({ elementClassName, changableClassName, index }));
  }

  getAllElements(elementClassName)[index].classList.add(changableClassName);
};

export const classRemove = ({ elementClassName, changableClassName, index, all }: IChangableElementByClass): void => {
  if (all) {
    getAllElements(elementClassName).forEach((_, index) =>
      classRemove({ elementClassName, changableClassName, index }));
  }

  getAllElements(elementClassName)[index].classList.remove(changableClassName);
};