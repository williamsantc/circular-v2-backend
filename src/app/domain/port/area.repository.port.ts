import { AreaModel } from '../model/area.model';

export interface AreaRepositoryPort {
  /**
   * Método para guardar o actualizar un area
   *
   * @param area objeto a persistir
   * */
  guardar(area: AreaModel): Promise<void>;

  /**
   * Método que lista todas las areas disponibles
   *
   * @returns Lista de areas como promesa
   * */
  listar(): Promise<AreaModel[]>;

  /**
   * Método que lista todas las areas disponibles que coincidan con una descripcion
   *
   * @returns Lista de areas como promesa
   * */
  listarPorDescripcion(descripcion: string): Promise<AreaModel[]>;

  /**
   * Método que permite buscar un area por su id
   *
   * @returns area encontrada o null en caso de no existir, ambos casos como promesa
   * */
  buscarPorId(idArea: number): Promise<AreaModel | null>;

  /**
   * Método que permite buscar un area por su descripcion
   *
   * @returns area encontrada o null en caso de no existir, ambos casos como promesa
   * */
  buscarPorDescripcion(descripcion: string): Promise<AreaModel | null>;
}
