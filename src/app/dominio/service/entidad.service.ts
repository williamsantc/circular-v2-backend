import { EntidadRepositoryPort } from '../port/entidad.repository.port';
import { EntidadModel } from '../model/entidad.model';
import { DataExistenteError } from '../error/data-existente.error';

export class EntidadService {
  public static readonly MENSAJE_ENTIDAD_ALMACENADA = 'Entidad registrada correctamente';
  public static readonly MENSAJE_ENTIDAD_MODIFICADA = 'Cambios almacenados en la entidad correctamente';
  public static readonly MENSAJE_NOMBRE_ENTIDAD_YA_EXISTE = 'Ya existe una entidad con el mismo nombre';

  constructor(private entidadRepository: EntidadRepositoryPort) {}

  public async guardar(entidad: EntidadModel): Promise<string> {
    if (await this.entidadRepository.buscarPorDescripcion(entidad.getDescripcion())) {
      throw new DataExistenteError(EntidadService.MENSAJE_NOMBRE_ENTIDAD_YA_EXISTE);
    }
    await this.entidadRepository.guardar(entidad);
    return entidad.getIdEntidad()
      ? EntidadService.MENSAJE_ENTIDAD_MODIFICADA
      : EntidadService.MENSAJE_ENTIDAD_ALMACENADA;
  }

  public listar(descripcion?: string): Promise<EntidadModel[]> {
    return descripcion ? this.entidadRepository.listarPorDescripcion(descripcion) : this.entidadRepository.listar();
  }
}
