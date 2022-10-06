
class MainCurrencyInput {
  protected mainClass: string;
  constructor(mainClass: string) {
    this.mainClass = mainClass;
  }

  render() {
    return `
      <input type="text" class="${this.mainClass}"/>
    `;
  }
}