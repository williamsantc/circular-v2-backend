import { ValidadorArgumentosUtil } from '../util/validador-argumentos.util';
import { InesperadoError } from '../error/inesperado.error';

export class AlmacenarModel {
  public static readonly MENSAJE_CIRCULAR_REQUERIDA = 'La circular es requerida';
  public static readonly MENSAJE_RUTA_REQUERIDA = 'La la ruta es requerida';

  private readonly idAlmacenar: number;
  private readonly idCircular: number;
  private readonly rutaArchivo: string;
  private readonly descripcion: string;

  constructor(idAlmacenar: number, idCircular: number, rutaArchivo: string, descripcion?: string) {
    ValidadorArgumentosUtil.validarNumeroRequerido(idCircular, AlmacenarModel.MENSAJE_CIRCULAR_REQUERIDA);
    if (!rutaArchivo || !rutaArchivo.trim()) {
      throw new InesperadoError(AlmacenarModel.MENSAJE_RUTA_REQUERIDA);
    }
    this.idAlmacenar = idAlmacenar;
    this.idCircular = idCircular;
    this.rutaArchivo = rutaArchivo;
    if (descripcion) {
      this.descripcion = descripcion;
    }
  }

  public getIdCircular() {
    return this.idAlmacenar;
  }

  public getCircular() {
    return this.idCircular;
  }

  public getRutaArchivo() {
    return this.rutaArchivo;
  }

  public getDescripcion() {
    return this.descripcion;
  }
}
