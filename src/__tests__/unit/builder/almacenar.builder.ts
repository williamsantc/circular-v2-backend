import { AlmacenarModel } from '../../../app/dominio/model/almacenar.model';

export class AlmacenarBuilder {
  private idAlmacenar: number;
  private idCircular: number;
  private rutaArchivo: string;
  private descripcion: string;

  constructor() {
    this.idCircular = 1;
    this.rutaArchivo = 'ruta';
    this.descripcion = 'descripción';
  }

  public withIdAlmacenar(idAlmacenar: number) {
    this.idAlmacenar = idAlmacenar;
    return this;
  }

  public withIdCircular(idCircular: number) {
    this.idCircular = idCircular;
    return this;
  }

  public withRutaArchivo(rutaArchivo: string) {
    this.rutaArchivo = rutaArchivo;
    return this;
  }

  public withDescripcion(descripcion: string) {
    this.descripcion = descripcion;
    return this;
  }

  public build() {
    return new AlmacenarModel(this.idAlmacenar, this.idCircular, this.rutaArchivo, this.descripcion);
  }
}
