export const elementGuard = (elem: HTMLElement | null): boolean => {
  return elem === null ? false : true;
};

export const shortString = (str: string): string => {
  if (str.length > 20) {
    return str.slice(0, 20) + '...';
  } else {
    return str;
  }
};

export const getElement = (selector: string) => {
  const element = document.querySelector(`.${selector}`);
  return element;
};

export const getAllElements = (selector: string) => {
  const elements = document.querySelectorAll(`.${selector}`);
  return elements;
};

export const fixValue = (value: number) => {
  if (value.toFixed(2) === '1.00') return '1';

  for (let i = 2; i <= 6; i++) {
    if (value.toFixed(i)[i] !== '0') return value.toFixed(i);
  }

  return value.toFixed(7);
};
