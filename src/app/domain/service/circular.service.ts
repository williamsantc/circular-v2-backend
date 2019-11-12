import { CircularRepositoryPort } from '../port/circular.repository.port';
import { CircularModel } from '../model/circular.model';
import { AlmacenarRepositoryPort } from '../port/almacenar.repository.port';
import { CircularAlmacenadaError } from '../error/circular-almacenada.error';
import { FestivosColombiaUtil } from '../util/fechas/festivos-colombia.util';
import { DiaEnum } from '../util/fechas/dia.enum';
import { DiaNoHabilError } from '../error/dia-no-habil.error';

export class CircularService {
  public static readonly MENSAJE_CIRCULAR_CREADA = 'Circular creada  correctamente';
  public static readonly MENSAJE_CIRCULAR_MODIFICADA = 'Cambios almacenados en la circular correctamente';
  public static readonly MENSAJE_DIA_NO_HABIL = 'El día seleccionado no es un día hábil';
  public static readonly MENSAJE_CARGA_CIRCULAR_REALIZADA =
    'La carga de la circular firmada ya fue realizada, no se permiten cambios';

  constructor(
    private circularRepository: CircularRepositoryPort,
    private almacenarRepository: AlmacenarRepositoryPort,
    private festivosColombia: FestivosColombiaUtil,
  ) {}

  public async guardar(circular: CircularModel) {
    if (circular.getIdCircular() && (await this.almacenarRepository.buscarPorIdCircular())) {
      throw new CircularAlmacenadaError(CircularService.MENSAJE_CARGA_CIRCULAR_REALIZADA);
    }
    this.consultarDiaHabil(circular.getFecha());
    await this.circularRepository.guardar(circular);
    return circular.getIdCircular()
      ? CircularService.MENSAJE_CIRCULAR_MODIFICADA
      : CircularService.MENSAJE_CIRCULAR_CREADA;
  }

  public async eliminar(idCircular: number) {
    await this.circularRepository.eliminar(idCircular);
  }

  public consultarDiaHabil(fecha: Date) {
    if (
      this.festivosColombia.esFestivo(fecha) ||
      fecha.getUTCDay() === DiaEnum.DOMINGO ||
      fecha.getUTCDay() === DiaEnum.SABADO
    ) {
      throw new DiaNoHabilError(CircularService.MENSAJE_DIA_NO_HABIL);
    }
  }
}
