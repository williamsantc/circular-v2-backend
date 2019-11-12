import { AreaService } from '../../../../app/dominio/service/area.service';
import { SinonStubbedInstance } from 'sinon';
import { AreaRepositoryPort } from '../../../../app/dominio/port/area.repository.port';
import { AreaRepositoryAdapter } from '../../../../app/infraestructura/repository/area.repository.adapter';
import { expect, sinon } from '@loopback/testlab';
import { AreaBuilder } from '../../builder/area.builder';
import { DataExistenteError } from '../../../../app/dominio/error/data-existente.error';

describe('AreaService', () => {
  let clasePrueba: AreaService;
  let areaRepositoryStub: SinonStubbedInstance<AreaRepositoryPort>;

  beforeEach(() => {
    areaRepositoryStub = sinon.createStubInstance(AreaRepositoryAdapter);
    clasePrueba = new AreaService(areaRepositoryStub);
  });

  context('Cuando se lanzan pruebas al método guardar', () => {
    it('Debería arrojar error DataExistenteError con area existente ', async () => {
      // Arrange
      const area = new AreaBuilder().build();
      areaRepositoryStub.buscarPorDescripcion.returns(new Promise(resolve => resolve(area)));

      // Act
      await expect(clasePrueba.guardar(area))
        // Assert
        .rejectedWith(new DataExistenteError(AreaService.MENSAJE_NOMBRE_AREA_YA_EXISTE));
    });
  });
});
