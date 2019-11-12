import { AreaModel } from '../../../app/dominio/model/area.model';

export class AreaBuilder {
  private idArea: number;
  private descripcion: string;

  constructor() {
    this.descripcion = 'desc';
  }

  withIdArea(idArea: number) {
    this.idArea = idArea;
    return this;
  }

  withDescripcion(descripcion: string) {
    this.descripcion = descripcion;
    return this;
  }

  build() {
    return new AreaModel(this.idArea, this.descripcion);
  }
}
