export default class SaveFile<T> {
  data: T | undefined;

  constructor(public key: string) {}

  save(data: T): void {
    const dataStr = JSON.stringify(data);
    localStorage.setItem(this.key, dataStr);
  }

  load(): T | undefined {
    const str = localStorage.getItem(this.key);
    try {
      this.data = JSON.parse(str);
      return this.data;
    } catch (err) {
      return undefined;
    }
  }

}