import { ResponsableRepositoryPort } from '../port/responsable.repository.port';
import { ResponsableModel } from '../model/responsable.model';
import { DataExistenteError } from '../error/data-existente.error';

export class ResponsableService {
  public static readonly MENSAJE_RESPONSABLE_ALMACENADO = 'Responsable Registrado correctamente';
  public static readonly MENSAJE_RESPONSABLE_MODIFICADO = 'Cambios almacenados en el responsable correctamente';
  public static readonly MENSAJE_RESPONSABLE_YA_EXISTE = 'Ya existe un responsable con el mismo nombre o cargo';

  constructor(private responsableRepository: ResponsableRepositoryPort) {}

  public async guardar(responsable: ResponsableModel): Promise<string> {
    if (
      (await this.responsableRepository.buscarPorNombre(responsable.getNombre())) ||
      (await this.responsableRepository.buacarPorCargo(responsable.getCargo()))
    ) {
      throw new DataExistenteError(ResponsableService.MENSAJE_RESPONSABLE_YA_EXISTE);
    }
    await this.responsableRepository.guardar(responsable);
    return responsable.getIdResponsable()
      ? ResponsableService.MENSAJE_RESPONSABLE_MODIFICADO
      : ResponsableService.MENSAJE_RESPONSABLE_ALMACENADO;
  }

  public listarPorNombre(nombre: string) {
    return this.responsableRepository.listarPorNombre(nombre);
  }

  public listarPorCargo(cargo: string) {
    return this.responsableRepository.listarPorCargo(cargo);
  }

  public listar() {
    return this.responsableRepository.listar();
  }
}
