export const elementGuard = (elem: HTMLElement | null): boolean => {
  return elem === null ? false : true;
};