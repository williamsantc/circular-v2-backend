import { AlmacenarModel } from '../model/almacenar.model';

export interface AlmacenarRepositoryPort {
  guardar(almacenar: AlmacenarModel): Promise<void>;

  listar(): Promise<AlmacenarModel[]>;

  buscarPorIdCircular(): Promise<AlmacenarModel | null>;
}
