import { ValidadorArgumentosUtil } from '../util/validador-argumentos.util';

export class ResponsableModel {
  public static readonly MENSAJE_NOMBRE_REQUERIDO = 'El nombre es requerido';
  public static readonly MENSAJE_CARGO_REQUERIDO = 'El nombre es requerido';

  private readonly idResponsable: number;
  private readonly nombre: string;
  private readonly cargo: string;

  constructor(idResponsable: number, nombre: string, cargo: string) {
    ValidadorArgumentosUtil.validarTextoRequerido(nombre, ResponsableModel.MENSAJE_NOMBRE_REQUERIDO);
    ValidadorArgumentosUtil.validarTextoRequerido(cargo, ResponsableModel.MENSAJE_CARGO_REQUERIDO);
    this.idResponsable = idResponsable;
    this.nombre = nombre;
    this.cargo = cargo;
  }

  public getIdResponsable() {
    return this.idResponsable;
  }

  public getNombre() {
    return this.nombre;
  }

  public getCargo() {
    return this.cargo;
  }
}
