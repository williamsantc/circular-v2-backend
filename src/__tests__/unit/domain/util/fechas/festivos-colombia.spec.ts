import { FestivosColombiaUtil } from '../../../../../app/domain/util/fechas/festivos-colombia.util';
import { MesEnum } from '../../../../../app/domain/util/fechas/mes.enum';
import { expect } from '@loopback/testlab';

describe('FestivosColombiaUtil', () => {
  let clasePrueba: FestivosColombiaUtil;
  const anioPrueba = 2019;

  beforeEach(() => {
    clasePrueba = new FestivosColombiaUtil(anioPrueba);
  });

  context('Cuando se lanzan pruebas al método esFestivo', () => {
    it('Debería arrojar true con fecha 19 agosto 2019', () => {
      // Arrange
      const resultadoEsperado = true;
      const dia = 19;

      // Act
      const resultado = clasePrueba.esFestivo(new Date(anioPrueba, MesEnum.AGOSTO, dia));

      // Assert
      expect(resultado).to.eql(resultadoEsperado);
    });

    it('Debería arrojar true con fecha 04 noviembre 2019', () => {
      // Arrange
      const resultadoEsperado = true;
      const dia = 4;

      // Act
      const resultado = clasePrueba.esFestivo(new Date(anioPrueba, MesEnum.NOVIEMBRE, dia));

      // Assert
      expect(resultado).to.eql(resultadoEsperado);
    });

    it('Debería arrojar false con fecha 12 noviembre 2019', () => {
      // Arrange
      const resultadoEsperado = false;
      const dia = 12;

      // Act
      const resultado = clasePrueba.esFestivo(new Date(anioPrueba, MesEnum.NOVIEMBRE, dia));

      // Assert
      expect(resultado).to.eql(resultadoEsperado);
    });
  });
});
