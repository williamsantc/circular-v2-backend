import {AreaService} from '../../../../app/dominio/service/area.service';
import {SinonStubbedInstance} from 'sinon';
import {AreaRepositoryPort} from '../../../../app/dominio/port/area.repository.port';
import {AreaRepositoryAdapter} from '../../../../app/infraestructura/repository/area.repository.adapter';
import {expect, sinon} from '@loopback/testlab';
import {AreaBuilder} from '../../builder/area.builder';
import {DataExistenteError} from '../../../../app/dominio/error/data-existente.error';

describe('AreaService', () => {
  let clasePrueba: AreaService;
  let areaRepositoryStub: SinonStubbedInstance<AreaRepositoryPort>;

  beforeEach(() => {
    areaRepositoryStub = sinon.createStubInstance(AreaRepositoryAdapter);
    clasePrueba = new AreaService(areaRepositoryStub);
  });

  context('Cuando se lanzan pruebas al método guardar', () => {
    it('Debería arrojar error DataExistenteError con area existente', async () => {
      // Arrange
      const area = new AreaBuilder().build();
      areaRepositoryStub.buscarPorDescripcion.returns(new Promise(resolve => resolve(area)));

      // Act
      await expect(clasePrueba.guardar(area))
      // Assert
      .rejectedWith(new DataExistenteError(AreaService.MENSAJE_NOMBRE_AREA_YA_EXISTE));
    });

    it('Debería guardar y retornar mensaje de area almacenada', async () => {
      // Arrange
      const area = new AreaBuilder().build();
      const mensajeEsperado = AreaService.MENSAJE_AREA_ALMACENADA;
      const llamadoMetodoGuardar = true;
      areaRepositoryStub.buscarPorDescripcion.returns(new Promise(resolve => resolve(null)));

      // Act
      const mensaje = await clasePrueba.guardar(area);

      // Assert
      expect(areaRepositoryStub.guardar.calledOnce).to.eql(llamadoMetodoGuardar);
      expect(mensaje).to.eql(mensajeEsperado);
    });

    it('Debería guardar y retornar mensaje de area modificada', async () => {
      // Arrange
      const area = new AreaBuilder().withIdArea(1).build();
      const mensajeEsperado = AreaService.MENSAJE_AREA_MODIFICADA;
      const llamadoMetodoGuardar = true;
      areaRepositoryStub.buscarPorDescripcion.returns(new Promise(resolve => resolve(null)));

      // Act
      const mensaje = await clasePrueba.guardar(area);

      // Assert
      expect(areaRepositoryStub.guardar.calledOnce).to.eql(llamadoMetodoGuardar);
      expect(mensaje).to.eql(mensajeEsperado);
    });
  });

  context('Cuando se lanzan pruebas al método listar', () => {

    it('Debería llamar al método listar del repositorio area sin descripcion', async () => {

      // Arrange
      areaRepositoryStub.listar.returns(new Promise(resolve => resolve([])));
      areaRepositoryStub.listarPorDescripcion.returns(new Promise(resolve => resolve([])));
      const listarPorDescripcion = false;
      const listarGeneral = true;

      // Act
      await clasePrueba.listar();

      // Assert
      expect(areaRepositoryStub.listarPorDescripcion.called).to.eql(listarPorDescripcion);
      expect(areaRepositoryStub.listar.called).to.eql(listarGeneral);
    });

    it('Debería llamar al método listar del repositorio area con descripcion', async () => {

      // Arrange
      areaRepositoryStub.listar.returns(new Promise(resolve => resolve([])));
      areaRepositoryStub.listarPorDescripcion.returns(new Promise(resolve => resolve([])));
      const descripcion = 'desc';
      const listarPorDescripcion = true;
      const listarGeneral = false;

      // Act
      await clasePrueba.listar(descripcion);

      // Assert
      expect(areaRepositoryStub.listarPorDescripcion.called).to.eql(listarPorDescripcion);
      expect(areaRepositoryStub.listar.called).to.eql(listarGeneral);
    });

  });
});
