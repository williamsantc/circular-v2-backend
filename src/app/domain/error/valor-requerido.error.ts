export class ValorRequeridoError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = ValorRequeridoError.name;
  }
}
