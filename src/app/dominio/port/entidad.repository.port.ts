import { EntidadModel } from '../model/entidad.model';

export interface EntidadRepositoryPort {
  /**
   * Método para guardar o actualizar una entidad
   *
   * @param area objeto a persistir
   * */
  guardar(entidad: EntidadModel): Promise<void>;

  /**
   * Método que lista todas las entidades disponibles
   *
   * @returns Lista de entidades como promesa
   * */
  listar(): Promise<EntidadModel[]>;

  /**
   * Método que lista todas las entidades disponibles que coincidan con una descripcion
   *
   * @returns Lista de entidades como promesa
   * */
  listarPorDescripcion(descripcion: string): Promise<EntidadModel[]>;

  /**
   * Método que permite buscar una entidad por su id
   *
   * @returns entidad encontrada o null en caso de no existir, ambos casos como promesa
   * */
  buscarPorId(idEntidad: number): Promise<EntidadModel | null>;

  /**
   * Método que permite buscar una entidad por su descripcion
   *
   * @returns entidad encontrada o null en caso de no existir, ambos casos como promesa
   * */
  buscarPorDescripcion(descripcion: string): Promise<EntidadModel | null>;
}
