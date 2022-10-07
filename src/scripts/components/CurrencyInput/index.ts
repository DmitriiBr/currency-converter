export class MainCurrencyInput {
  protected mainClass: string;

  constructor(mainClass: string) {
    this.mainClass = mainClass;
  }

  render() {
    return `
      <div class="${this.mainClass}__wrapper">
        <input 
          type="number" 
          class="${this.mainClass}__field 
          ${this.mainClass}__field--currency"
        >
      </div>
    `;
  }
}