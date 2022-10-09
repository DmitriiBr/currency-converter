export class MainCurrencyInput {
  protected mainClass: string;

  constructor(mainClass: string) {
    this.mainClass = mainClass;
  }

  render() {
    return `
<<<<<<< HEAD
      <input type="text" class="${this.mainClass}"/>
=======
      <div class="${this.mainClass}__wrapper">
        <input 
          type="number" 
          class="${this.mainClass}__field 
          ${this.mainClass}__field--currency"
        >
      </div>
>>>>>>> 3045061fa08f1043a4e3635a645e7d2b06ec3c4b
    `;
  }
}