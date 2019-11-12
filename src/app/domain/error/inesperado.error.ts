export class InesperadoError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = InesperadoError.name;
  }
}
