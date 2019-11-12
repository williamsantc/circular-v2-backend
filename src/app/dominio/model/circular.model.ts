import { ValidadorArgumentosUtil } from '../util/validador-argumentos.util';

export class CircularModel {
  public static readonly MENSAJE_ASUNTO_REQUERIDO = 'El asunto es requerido';
  public static readonly MENSAJE_CONTENIDO_REQUERIDO = 'El contenido es requerido';
  public static readonly MENSAJE_AREA_REQUERIDA = 'El area es requerida';
  public static readonly MENSAJE_ENTIDAD_REQUERIDA = 'La entidad es requerida';
  public static readonly MENSAJE_RESPONSABLE_REQUERIDO = 'El responsable es requerido';

  private readonly idCircular: number;
  private readonly asunto: string;
  private readonly contenido: string;
  private readonly idArea: number;
  private readonly idEntidad: number;
  private readonly idResponsable: number;
  private readonly fecha: Date;

  constructor(
    idCircular: number,
    asunto: string,
    contenido: string,
    idArea: number,
    idEntidad: number,
    idResponsable: number,
    fecha: Date,
  ) {
    ValidadorArgumentosUtil.validarTextoRequerido(asunto, CircularModel.MENSAJE_ASUNTO_REQUERIDO);
    ValidadorArgumentosUtil.validarTextoRequerido(contenido, CircularModel.MENSAJE_CONTENIDO_REQUERIDO);
    ValidadorArgumentosUtil.validarNumeroRequerido(idArea, CircularModel.MENSAJE_AREA_REQUERIDA);
    ValidadorArgumentosUtil.validarNumeroRequerido(idEntidad, CircularModel.MENSAJE_ENTIDAD_REQUERIDA);
    ValidadorArgumentosUtil.validarNumeroRequerido(idResponsable, CircularModel.MENSAJE_RESPONSABLE_REQUERIDO);
    this.idCircular = idCircular;
    this.asunto = asunto;
    this.contenido = contenido;
    this.idArea = idArea;
    this.idEntidad = idEntidad;
    this.idResponsable = idResponsable;
    this.fecha = fecha;
  }

  public getIdCircular() {
    return this.idCircular;
  }

  public getAsunto() {
    return this.asunto;
  }

  public getContenido() {
    return this.contenido;
  }

  public getArea() {
    return this.idArea;
  }

  public getEntidad() {
    return this.idEntidad;
  }

  public getResponsable() {
    return this.idResponsable;
  }

  public getFecha() {
    return this.fecha;
  }
}
