import {AlmacenarRepositoryPort} from "../../dominio/port/almacenar.repository.port";
import {AlmacenarModel} from "../../dominio/model/almacenar.model";

export class AlmacenarRepositoryAdapter implements AlmacenarRepositoryPort {
  async buscarPorIdCircular(): Promise<AlmacenarModel | null> {
    return null;
  }

  async guardar(almacenar: AlmacenarModel): Promise<void> {}

  async listar(): Promise<AlmacenarModel[]> {
    return [];
  }
}
