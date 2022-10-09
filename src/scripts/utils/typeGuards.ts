export const instanceOfHTMLEelement = <T>(element: T): boolean => {
  if (element === null) return false;
  else if (element instanceof HTMLElement) return true;
  else return false;
};