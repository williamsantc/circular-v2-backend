import { TestsUtil } from '../../../util/tests.util';
import { expect } from '@loopback/testlab';
import { AlmacenarModel } from '../../../../app/dominio/model/almacenar.model';
import { ValorRequeridoError } from '../../../../app/dominio/error/valor-requerido.error';
import { InesperadoError } from '../../../../app/dominio/error/inesperado.error';

describe('AlmacenarModel', () => {
  const ID_ALMACENAR = TestsUtil.anyNumber();
  const ID_CIRCULAR = TestsUtil.anyNumber();
  const RUTA_ARCHIVO = TestsUtil.anyString();
  const DESCRIPCION = TestsUtil.anyString();
  context('Cuando se lanzan pruebas al constructor de la clase', () => {
    it('Debería arrojar el error ValorRequeridoError con campo idCircular nulo', async () => {
      const circularVacio = null;

      await expect(
        new Promise(resolve =>
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          resolve(new AlmacenarModel(ID_ALMACENAR, circularVacio, RUTA_ARCHIVO, DESCRIPCION)),
        ),
      ).rejectedWith(new ValorRequeridoError(AlmacenarModel.MENSAJE_CIRCULAR_REQUERIDA));
    });

    it('Debería arrojar el error ValorRequeridoError con campo rutaArchivo vacia', async () => {
      const rutaArchivo = '';

      await expect(
        new Promise(resolve => resolve(new AlmacenarModel(ID_ALMACENAR, ID_CIRCULAR, rutaArchivo, DESCRIPCION))),
      ).rejectedWith(new InesperadoError(AlmacenarModel.MENSAJE_RUTA_REQUERIDA));
    });
  });
});
