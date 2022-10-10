export const getElement = (className: string) => {
  const element = document.querySelector(`.${className}`);
  return element;
};

export const getAllElements = (className: string) => {
  const elements = document.querySelectorAll(`.${className}`);
  return elements;
};