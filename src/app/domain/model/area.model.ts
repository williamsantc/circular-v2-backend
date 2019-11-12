import { ValidadorArgumentosUtil } from '../util/validador-argumentos.util';

export class AreaModel {
  public static readonly MENSAJE_DESCRIPCION_REQUERIDO = 'La descripción es requerida';

  private readonly idArea: number;
  private readonly descripcion: string;

  constructor(idArea: number, descripcion: string) {
    ValidadorArgumentosUtil.validarTextoRequerido(descripcion, AreaModel.MENSAJE_DESCRIPCION_REQUERIDO);
    this.idArea = idArea;
    this.descripcion = descripcion;
  }

  public getIdArea() {
    return this.idArea;
  }

  public getDescripcion() {
    return this.descripcion;
  }
}
