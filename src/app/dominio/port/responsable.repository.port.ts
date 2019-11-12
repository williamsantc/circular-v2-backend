import { ResponsableModel } from '../model/responsable.model';

export interface ResponsableRepositoryPort {
  guardar(responsable: ResponsableModel): Promise<void>;

  listar(): Promise<ResponsableModel[]>;

  listarPorNombre(nombre: string): Promise<ResponsableModel[]>;

  listarPorCargo(cargo: string): Promise<ResponsableModel[]>;

  buscarPorId(idResponsable: number): Promise<ResponsableModel | null>;

  buscarPorNombre(nombre: string): Promise<ResponsableModel | null>;

  buacarPorCargo(cargo: string): Promise<ResponsableModel | null>;
}
