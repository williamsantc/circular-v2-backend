import { MesEnum } from './mes.enum';
import { DiaEnum } from './dia.enum';

export class FestivosColombiaUtil {
  private static get FESTIVOS_FIJOS() {
    return [
      [MesEnum.ENERO, 1], // AÑO NUEVO
      [MesEnum.MAYO, 1], // DIA DEL TRABAJO
      [MesEnum.JULIO, 20], // GRITO DE INDEPENDENCIA
      [MesEnum.AGOSTO, 7], // BATALLA DE BOYACA
      [MesEnum.DICIEMBRE, 8], // INMACULADA CONECPCION
      [MesEnum.DICIEMBRE, 25], // NAVIDAD
    ];
  }

  private static get FESTIVOS_MOVIBLES() {
    return [
      [MesEnum.ENERO, 6], // REYES MAGOS
      [MesEnum.MARZO, 19], // SAN JOSE
      [MesEnum.JUNIO, 29], // SAN PEDRO Y SAN PABLO
      [MesEnum.AGOSTO, 15], // ASUNCION DE LA VIRGEN
      [MesEnum.OCTUBRE, 12], // DIA DE LA RAZA
      [MesEnum.NOVIEMBRE, 1], // TODOS LOS SANTOS
      [MesEnum.NOVIEMBRE, 11], // INDEPENDENCIA DE CARTAGENA
    ];
  }

  private static readonly SIGUENTE_SEMANA = 8;

  public readonly festivos: Date[];

  constructor(year: number) {
    this.festivos = this.cargarFestivos(year);
  }

  public cargarFestivos(anio: number) {
    const lista = [];

    FestivosColombiaUtil.FESTIVOS_FIJOS.forEach(festivo => {
      const [mes, dia] = festivo;
      lista.push(new Date(anio, mes, dia));
    });

    FestivosColombiaUtil.FESTIVOS_MOVIBLES.forEach(festivo => {
      const [mes, dia] = festivo;
      const fecha = new Date(anio, mes, dia);
      const diaSemana = fecha.getUTCDay();
      if (diaSemana === DiaEnum.DOMINGO) {
        fecha.setUTCDate(fecha.getUTCDate() + 1);
      } else if (diaSemana > DiaEnum.LUNES) {
        fecha.setUTCDate(fecha.getUTCDate() + FestivosColombiaUtil.SIGUENTE_SEMANA - diaSemana);
      }
      lista.push(fecha);
    });

    const domingoPascua = FestivosColombiaUtil.determinarDomingoPascua(anio);

    lista.push(FestivosColombiaUtil.addDias(domingoPascua, -3)); // JUEVES SANTO
    lista.push(FestivosColombiaUtil.addDias(domingoPascua, -2)); // VIERNES SANTO
    lista.push(FestivosColombiaUtil.addDias(domingoPascua, 43)); // ASCENCION DE JESUS
    lista.push(FestivosColombiaUtil.addDias(domingoPascua, 64)); // CORPUS CRISTY
    lista.push(FestivosColombiaUtil.addDias(domingoPascua, 71)); // SAGRADO CORAZON DE JESUS

    return lista;
  }

  private static addDias(fecha: Date, dias: number) {
    const tmp = new Date(fecha.getTime());
    tmp.setUTCDate(tmp.getUTCDate() + dias);
    return tmp;
  }

  private static determinarDomingoPascua(year: number) {
    const M = 24; // CONSTANTES FORMULA 1900-2100
    const N = 5; // CONSTANTES FORMULA 1900-2100
    const A = year;

    const a = A % 19;
    const b = A % 4;
    const c = A % 7;
    const d = (19 * a + M) % 30;
    const e = (2 * b + 4 * c + 6 * d + N) % 7;

    const fecha = new Date(year, MesEnum.MARZO, 22); // 3 -> Abril, 0 -> Enero
    fecha.setUTCDate(fecha.getUTCDate() + d + e);

    if (fecha.getUTCMonth() === MesEnum.ABRIL) {
      // 3 -> Abril
      if (fecha.getUTCDate() === 26) {
        fecha.setUTCDate(19);
      } else if (fecha.getUTCDate() === 25 && d === 28 && e === 6 && a > 10) {
        fecha.setUTCDate(18);
      }
    }

    return fecha;
  }

  public esFestivo(fecha: Date): boolean {
    const anio = fecha.getUTCFullYear();
    const mes = fecha.getUTCMonth();
    const dia = fecha.getUTCDate();
    const fechaSimple = new Date(anio, mes, dia);
    return this.festivos.some(festivo => festivo.getTime() === fechaSimple.getTime());
  }
}
