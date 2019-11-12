import {AreaRepositoryPort} from "../../dominio/port/area.repository.port";
import {AreaModel} from "../../dominio/model/area.model";


export class AreaRepositoryAdapter implements AreaRepositoryPort {
  async buscarPorDescripcion(descripcion: string): Promise<AreaModel | null> {
    return null;
  }

  async buscarPorId(idArea: number): Promise<AreaModel | null> {
    return null;
  }

  async guardar(area: AreaModel): Promise<void> {
    return undefined;
  }

  async listar(): Promise<AreaModel[]> {
    return [];
  }

  async listarPorDescripcion(descripcion: string): Promise<AreaModel[]> {
    return [];
  }
}
