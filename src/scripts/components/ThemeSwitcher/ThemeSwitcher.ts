export class ThemeSwitcher {
  private mainClass: string | undefined;

  constructor(mainClass?: string) {
    this.mainClass = mainClass;
  }

  getClass() {
    return this.mainClass;
  }
}