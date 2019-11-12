import { CircularRepositoryPort } from '../../dominio/port/circular.repository.port';
import { CircularModel } from '../../dominio/model/circular.model';

export class CircularRepositoryAdapter implements CircularRepositoryPort {
  async eliminar(idCircular: number): Promise<void> {}

  async guardar(circular: CircularModel): Promise<void> {}

  async listar(): Promise<CircularModel[]> {
    return [];
  }
}
