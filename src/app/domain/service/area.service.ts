import { DataExistenteError } from '../error/data-existente.error';
import { AreaRepositoryPort } from '../port/area.repository.port';
import { AreaModel } from '../model/area.model';

export class AreaService {
  public static readonly MENSAJE_AREA_ALMACENADA = 'Area registrada correctamente';
  public static readonly MENSAJE_AREA_MODIFICADA = 'Cambios almacenados en el area correctamente';
  public static readonly MENSAJE_NOMBRE_AREA_YA_EXISTE = 'Ya existe una area con el mismo nombre';

  constructor(private areaRepository: AreaRepositoryPort) {}

  public async guardar(area: AreaModel): Promise<string> {
    if (await this.areaRepository.buscarPorDescripcion(area.getDescripcion())) {
      throw new DataExistenteError(AreaService.MENSAJE_NOMBRE_AREA_YA_EXISTE);
    }
    await this.areaRepository.guardar(area);
    return area.getIdArea() ? AreaService.MENSAJE_AREA_MODIFICADA : AreaService.MENSAJE_AREA_ALMACENADA;
  }

  public listar(descripcion?: string): Promise<AreaModel[]> {
    return descripcion ? this.areaRepository.listarPorDescripcion(descripcion) : this.areaRepository.listar();
  }
}
