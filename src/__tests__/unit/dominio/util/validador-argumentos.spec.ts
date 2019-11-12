import { expect } from '@loopback/testlab';
import { ValorRequeridoError } from '../../../../app/dominio/error/valor-requerido.error';
import { ValidadorArgumentosUtil } from '../../../../app/dominio/util/validador-argumentos.util';

describe('ValidadorArgumentosUtil', () => {
  const MENSAJE_PERSONALIZADO = 'Texto ejemplo';

  context('Cuando se lanzan pruebas al método validarTextoRequerido', () => {
    it('Debería arrojar el error ValorRequeridoError con campo null', async () => {
      // Arrange
      const textoPrueba = null;

      // Act
      await expect(new Promise(resolve => resolve(ValidadorArgumentosUtil.validarTextoRequerido(textoPrueba))))
        // Assert
        .rejectedWith(new ValorRequeridoError(ValidadorArgumentosUtil.MENSAJE_GENERICO));
    });

    it('Debería arrojar el error ValorRequeridoError con campo undefined', async () => {
      // Arrange
      const textoPrueba = undefined;

      // Act
      await expect(new Promise(resolve => resolve(ValidadorArgumentosUtil.validarTextoRequerido(textoPrueba))))
        // Assert
        .rejectedWith(new ValorRequeridoError(ValidadorArgumentosUtil.MENSAJE_GENERICO));
    });

    it('Debería arrojar el error ValorRequeridoError con texto vacío', async () => {
      // Arrange
      const textoPrueba = '';

      // Act
      await expect(new Promise(resolve => resolve(ValidadorArgumentosUtil.validarTextoRequerido(textoPrueba))))
        // Assert
        .rejectedWith(new ValorRequeridoError(ValidadorArgumentosUtil.MENSAJE_GENERICO));
    });

    it('Debería arrojar el error ValorRequeridoError con campo null y mensaje personalizado', async () => {
      // Arrange
      const textoPrueba = '';

      // Act
      await expect(
        new Promise(resolve =>
          resolve(ValidadorArgumentosUtil.validarTextoRequerido(textoPrueba, MENSAJE_PERSONALIZADO)),
        ),
      )
        // Assert
        .rejectedWith(new ValorRequeridoError(MENSAJE_PERSONALIZADO));
    });
  });

  context('Cuando se lanzan pruebas al método validarNumeroRequerido', () => {
    it('Debería arrojar el error ValorRequeridoError con campo null', async () => {
      // Arrange
      const numeroPrueba = null;

      // Act
      await expect(new Promise(resolve => resolve(ValidadorArgumentosUtil.validarNumeroRequerido(numeroPrueba))))
        // Assert
        .rejectedWith(new ValorRequeridoError(ValidadorArgumentosUtil.MENSAJE_GENERICO));
    });

    it('Debería arrojar el error ValorRequeridoError con campo undefined', async () => {
      // Arrange
      const numeroPrueba = undefined;

      // Act
      await expect(new Promise(resolve => resolve(ValidadorArgumentosUtil.validarNumeroRequerido(numeroPrueba))))
        // Assert
        .rejectedWith(new ValorRequeridoError(ValidadorArgumentosUtil.MENSAJE_GENERICO));
    });

    it('Debería arrojar el error ValorRequeridoError con campo texto', async () => {
      // Arrange
      const numeroPrueba = 'text';

      // Act
      await expect(new Promise(resolve => resolve(ValidadorArgumentosUtil.validarNumeroRequerido(numeroPrueba))))
        // Assert
        .rejectedWith(new ValorRequeridoError(ValidadorArgumentosUtil.MENSAJE_GENERICO));
    });

    it('Debería arrojar el error ValorRequeridoError con campo texto y mensaje personalizado', async () => {
      // Arrange
      const numeroPrueba = 'text';

      // Act
      await expect(
        new Promise(resolve =>
          resolve(ValidadorArgumentosUtil.validarNumeroRequerido(numeroPrueba, MENSAJE_PERSONALIZADO)),
        ),
      )
        // Assert
        .rejectedWith(new ValorRequeridoError(MENSAJE_PERSONALIZADO));
    });
  });
});
