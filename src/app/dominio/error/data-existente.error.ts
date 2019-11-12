export class DataExistenteError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = DataExistenteError.name;
  }
}
