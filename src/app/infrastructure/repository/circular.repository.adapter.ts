import { CircularRepositoryPort } from '../../domain/port/circular.repository.port';
import { CircularModel } from '../../domain/model/circular.model';

export class CircularRepositoryAdapter implements CircularRepositoryPort {
  async eliminar(idCircular: number): Promise<void> {}

  async guardar(circular: CircularModel): Promise<void> {}

  async listar(): Promise<CircularModel[]> {
    return [];
  }
}
