export const getElement = (selector: string) => {
  const element = document.querySelector(`.${selector}`);
  return element;
};

export const getAllElements = (selector: string) => {
  const elements = document.querySelectorAll(`.${selector}`);
  return elements;
};