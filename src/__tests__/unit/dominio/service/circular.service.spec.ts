import { expect, sinon } from '@loopback/testlab';
import { CircularService } from '../../../../app/dominio/service/circular.service';
import { SinonStubbedInstance } from 'sinon';
import { CircularRepositoryPort } from '../../../../app/dominio/port/circular.repository.port';
import { AlmacenarRepositoryPort } from '../../../../app/dominio/port/almacenar.repository.port';
import { FestivosColombiaUtil } from '../../../../app/dominio/util/fechas/festivos-colombia.util';
import { CircularRepositoryAdapter } from '../../../../app/infraestructura/repository/circular.repository.adapter';
import { AlmacenarRepositoryAdapter } from '../../../../app/infraestructura/repository/almacenar.repository.adapter';
import { MesEnum } from '../../../../app/dominio/util/fechas/mes.enum';
import { DiaNoHabilError } from '../../../../app/dominio/error/dia-no-habil.error';
import { AlmacenarBuilder } from '../../builder/almacenar.builder';
import { CircularBuilder } from '../../builder/circular.builder';
import { CircularAlmacenadaError } from '../../../../app/dominio/error/circular-almacenada.error';
import {CircularQueryType} from "../../../../app/dominio/model/circular-query.type";

describe('CircularService', () => {
  let clasePrueba: CircularService;
  let circularRepositoryStub: SinonStubbedInstance<CircularRepositoryPort>;
  let almacenarRepositoryStub: SinonStubbedInstance<AlmacenarRepositoryPort>;
  let festivosColombiaStub: SinonStubbedInstance<FestivosColombiaUtil>;

  const anioPrueba = 2019;

  beforeEach(() => {
    circularRepositoryStub = sinon.createStubInstance(CircularRepositoryAdapter);
    almacenarRepositoryStub = sinon.createStubInstance(AlmacenarRepositoryAdapter);
    festivosColombiaStub = sinon.createStubInstance(FestivosColombiaUtil);

    clasePrueba = new CircularService(circularRepositoryStub, almacenarRepositoryStub, festivosColombiaStub);
  });

  context('Cuando se lanzan pruebas al método consultarDiaHabil', () => {
    it('Debería arrojar el error DiaNoHabilError con día festivo colombiano', async () => {
      // Arrange
      festivosColombiaStub.esFestivo.returns(true);
      const fechaPrueba = new Date(anioPrueba, MesEnum.OCTUBRE, 28);

      // Act
      await expect(new Promise(resolve => resolve(clasePrueba.consultarDiaHabil(fechaPrueba))))
        // Assert
        .rejectedWith(new DiaNoHabilError(CircularService.MENSAJE_DIA_NO_HABIL));
    });

    it('Debería arrojar el error DiaNoHabilError con día sábado', async () => {
      // Arrange
      festivosColombiaStub.esFestivo.returns(false);
      const fechaPrueba = new Date(anioPrueba, MesEnum.NOVIEMBRE, 9);

      // Act
      await expect(new Promise(resolve => resolve(clasePrueba.consultarDiaHabil(fechaPrueba))))
        // Assert
        .rejectedWith(new DiaNoHabilError(CircularService.MENSAJE_DIA_NO_HABIL));
    });

    it('Debería arrojar el error DiaNoHabilError con día domingo', async () => {
      // Arrange
      festivosColombiaStub.esFestivo.returns(false);
      const fechaPrueba = new Date(anioPrueba, MesEnum.NOVIEMBRE, 10);

      // Act
      await expect(new Promise(resolve => resolve(clasePrueba.consultarDiaHabil(fechaPrueba))))
        // Assert
        .rejectedWith(new DiaNoHabilError(CircularService.MENSAJE_DIA_NO_HABIL));
    });
  });

  context('Cuando se lanzan pruebas al método guardar', () => {
    it('Debería arrojar el error CircularAlmacenadaError con circular previamente almacenada', async () => {
      // Arrange
      const almacenar = new AlmacenarBuilder().build();
      const circular = new CircularBuilder().withIdCircular(1).build();
      almacenarRepositoryStub.buscarPorIdCircular.returns(new Promise(resolve => resolve(almacenar)));

      // Act
      await expect(clasePrueba.guardar(circular))
        // Assert
        .rejectedWith(new CircularAlmacenadaError(CircularService.MENSAJE_CARGA_CIRCULAR_REALIZADA));
    });

    it('Debería arrojar texto de guardado exitoso', async () => {
      // Arrange
      const textoEsperado = CircularService.MENSAJE_CIRCULAR_CREADA;
      const circular = new CircularBuilder().build();
      almacenarRepositoryStub.buscarPorIdCircular.returns(new Promise(resolve => resolve(null)));
      sinon.replace(clasePrueba, 'consultarDiaHabil', sinon.fake());

      // Act
      const texto = await clasePrueba.guardar(circular);

      // Assert
      expect(texto).to.eql(textoEsperado);
    });

    it('Debería arrojar texto de cambios almacenados', async () => {
      // Arrange
      const textoEsperado = CircularService.MENSAJE_CIRCULAR_MODIFICADA;
      const circular = new CircularBuilder().withIdCircular(1).build();
      almacenarRepositoryStub.buscarPorIdCircular.returns(new Promise(resolve => resolve(null)));
      sinon.replace(clasePrueba, 'consultarDiaHabil', sinon.fake());

      // Act
      const texto = await clasePrueba.guardar(circular);

      // Assert
      expect(texto).to.eql(textoEsperado);
    });
  });

  context('Cuando se lanzan pruebas al método eliminar', () => {
    it('Debería llamar al método eliminar del repositorio circular', async () => {
      // Arrange
      const idCircular = 1;
      const metodoLlamadoUnaVez = true;

      // Act
      await clasePrueba.eliminar(idCircular);

      // Assert
      expect(circularRepositoryStub.eliminar.calledOnce).to.eql(metodoLlamadoUnaVez);
    });
  });

  context('Cuando se lanzan pruebas al método listar', () => {
    it('Debería llamar al método listar del repositorio circular', async () => {
      // Arrange
      const circularQuery: CircularQueryType = {};
      const metodoLlamadoUnaVez = true;

      // Act
      await clasePrueba.listar(circularQuery);

      // Assert
      expect(circularRepositoryStub.listar.calledOnce).to.eql(metodoLlamadoUnaVez);
    });
  });
});
