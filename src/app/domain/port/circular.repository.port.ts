import { CircularModel } from '../model/circular.model';

export interface CircularRepositoryPort {
  guardar(circular: CircularModel): Promise<void>;

  listar(): Promise<CircularModel[]>;

  eliminar(idCircular: number): Promise<void>;
}
