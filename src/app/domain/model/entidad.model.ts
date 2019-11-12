import { ValidadorArgumentosUtil } from '../util/validador-argumentos.util';

export class EntidadModel {
  public static readonly MENSAJE_DESCRIPCION_REQUERIDO = 'La descripción es requerida';

  private readonly idEntidad: number;
  private readonly descripcion: string;

  constructor(idEntidad: number, descripcion: string) {
    ValidadorArgumentosUtil.validarTextoRequerido(descripcion, EntidadModel.MENSAJE_DESCRIPCION_REQUERIDO);
    this.idEntidad = idEntidad;
    this.descripcion = descripcion;
  }

  public getIdEntidad() {
    return this.idEntidad;
  }

  public getDescripcion() {
    return this.descripcion;
  }
}
