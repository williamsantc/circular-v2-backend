export class DiaNoHabilError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = DiaNoHabilError.name;
  }
}
