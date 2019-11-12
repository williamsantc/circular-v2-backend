import { expect } from '@loopback/testlab';
import { TestsUtil } from '../../../util/tests.util';
import { CircularModel } from '../../../../app/domain/model/circular.model';
import { ValorRequeridoError } from '../../../../app/domain/error/valor-requerido.error';

describe('CircularModel', () => {
  context('Cuando se lanzan pruebas al constructor de la clase', () => {
    const ID_CIRCULAR = TestsUtil.anyNumber();
    const ASUNTO = TestsUtil.anyString();
    const CONTENIDO = TestsUtil.anyString();
    const ID_AREA = TestsUtil.anyNumber();
    const ID_ENTIDAD = TestsUtil.anyNumber();
    const ID_RESPONSABLE = TestsUtil.anyNumber();
    const FECHA = new Date();

    it('Debería arrojar el error ValorRequeridoError con campo asunto vacío', async () => {
      // Arrange
      const asuntoVacio = '';

      // Act
      await expect(
        new Promise(resolve =>
          resolve(new CircularModel(ID_CIRCULAR, asuntoVacio, CONTENIDO, ID_AREA, ID_ENTIDAD, ID_RESPONSABLE, FECHA)),
        ),
      )
        // Assert
        .rejectedWith(new ValorRequeridoError(CircularModel.MENSAJE_ASUNTO_REQUERIDO));
    });

    it('Debería arrojar el error ValorRequeridoError con campo contenido vacío', async () => {
      // Arrange
      const contenidoVacio = '';

      // Act
      await expect(
        new Promise(resolve =>
          resolve(new CircularModel(ID_CIRCULAR, ASUNTO, contenidoVacio, ID_AREA, ID_ENTIDAD, ID_RESPONSABLE, FECHA)),
        ),
      )
        // Assert
        .rejectedWith(new ValorRequeridoError(CircularModel.MENSAJE_CONTENIDO_REQUERIDO));
    });

    it('Debería arrojar el error ValorRequeridoError con campo idArea nulo', async () => {
      // Arrange
      const areaVacia = null;

      // Act

      await expect(
        new Promise(resolve =>
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          resolve(new CircularModel(ID_CIRCULAR, ASUNTO, CONTENIDO, areaVacia, ID_ENTIDAD, ID_RESPONSABLE, FECHA)),
        ),
      )
        // Assert
        .rejectedWith(new ValorRequeridoError(CircularModel.MENSAJE_AREA_REQUERIDA));
    });

    it('Debería arrojar el error ValorRequeridoError con campo idEntidad nulo', async () => {
      // Arrange
      const entidadVacia = null;

      // Act

      await expect(
        new Promise(resolve =>
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          resolve(new CircularModel(ID_CIRCULAR, ASUNTO, CONTENIDO, ID_AREA, entidadVacia, ID_RESPONSABLE, FECHA)),
        ),
      )
        // Assert
        .rejectedWith(new ValorRequeridoError(CircularModel.MENSAJE_ENTIDAD_REQUERIDA));
    });

    it('Debería arrojar el error ValorRequeridoError con campo idResponsable nulo', async () => {
      // Arrange
      const responsableVacio = null;

      // Act

      await expect(
        new Promise(resolve =>
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          resolve(new CircularModel(ID_CIRCULAR, ASUNTO, CONTENIDO, ID_AREA, ID_ENTIDAD, responsableVacio, FECHA)),
        ),
      )
        // Assert
        .rejectedWith(new ValorRequeridoError(CircularModel.MENSAJE_RESPONSABLE_REQUERIDO));
    });
  });
});
