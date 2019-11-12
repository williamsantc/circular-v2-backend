export class CircularAlmacenadaError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = CircularAlmacenadaError.name;
  }
}
