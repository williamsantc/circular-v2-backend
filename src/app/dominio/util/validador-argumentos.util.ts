import { ValorRequeridoError } from '../error/valor-requerido.error';

export class ValidadorArgumentosUtil {
  public static readonly MENSAJE_GENERICO = 'Los datos ingresados no cumplen con los criterios requeridos.';

  public static validarTextoRequerido(
    valor: string | undefined | null,
    mensaje = ValidadorArgumentosUtil.MENSAJE_GENERICO,
  ) {
    if (!valor || !valor.trim()) {
      throw new ValorRequeridoError(mensaje);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static validarNumeroRequerido(valor: any, mensaje = ValidadorArgumentosUtil.MENSAJE_GENERICO) {
    if (valor === undefined || valor === null || isNaN(valor)) {
      throw new ValorRequeridoError(mensaje);
    }
  }
}
