import { CircularModel } from '../model/circular.model';
import {CircularQueryType} from "../model/circular-query.type";

export interface CircularRepositoryPort {
  guardar(circular: CircularModel): Promise<void>;

  listar(query: CircularQueryType): Promise<CircularModel[]>;

  eliminar(idCircular: number): Promise<void>;
}
