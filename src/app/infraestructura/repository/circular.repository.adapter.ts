import { CircularRepositoryPort } from '../../dominio/port/circular.repository.port';
import { CircularModel } from '../../dominio/model/circular.model';
import {CircularQueryType} from "../../dominio/model/circular-query.type";

export class CircularRepositoryAdapter implements CircularRepositoryPort {
  async eliminar(idCircular: number): Promise<void> {}

  async guardar(circular: CircularModel): Promise<void> {}

  async listar(query: CircularQueryType): Promise<CircularModel[]> {
    return [];
  }
}
