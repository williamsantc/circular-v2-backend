import { CircularModel } from '../../../app/domain/model/circular.model';

export class CircularBuilder {
  private idCircular: number;
  private asunto: string;
  private contenido: string;
  private idArea: number;
  private idEntidad: number;
  private idResponsable: number;
  private fecha: Date;

  constructor() {
    this.asunto = 'lorem';
    this.contenido = 'ipsum';
    this.idArea = 1;
    this.idEntidad = 1;
    this.idResponsable = 1;
    this.fecha = new Date();
  }

  public withIdCircular(idCircular: number) {
    this.idCircular = idCircular;
    return this;
  }

  public withAsunto(asunto: string) {
    this.asunto = asunto;
    return this;
  }

  public withContenido(contenido: string) {
    this.contenido = contenido;
    return this;
  }

  public withIdArea(idArea: number) {
    this.idArea = idArea;
    return this;
  }

  public withIdEntidad(idEntidad: number) {
    this.idEntidad = idEntidad;
    return this;
  }

  public withIdResponsable(idResponsable: number) {
    this.idResponsable = idResponsable;
    return this;
  }

  public withFecha(fecha: Date) {
    this.fecha = fecha;
    return this;
  }

  public build() {
    return new CircularModel(
      this.idCircular,
      this.asunto,
      this.contenido,
      this.idArea,
      this.idEntidad,
      this.idResponsable,
      this.fecha,
    );
  }
}
