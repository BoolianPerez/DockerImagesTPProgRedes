import { SetTenis } from "../other/SetTenis";
import { Tenista } from "./Tenista";
import errors from "@src/constants/Errors";

export class Partido implements dataObject{
    static PATH = "partidos.json"
    id: number;
    jugador1: Tenista;
    jugador2: Tenista;
    ganador: Tenista;
    sets: SetTenis[];
    constructor (
      id: number,
      jugador1: Tenista,
      jugador2: Tenista,
      ganador: Tenista,
      sets: SetTenis[]
      ) {
       if (!(ganador.id == jugador1.id || ganador.id == jugador2.id)){
          throw Error(errors.GANADORNOJUGOERROR())
       }
        this.id= id
        this.jugador1 = jugador1
        this.jugador2 = jugador2
        this.ganador = ganador
        this.sets = sets
      }

    static isPartido(partido: any): boolean{
      return(
        typeof partido === 'object' &&
        'id' in partido && typeof partido.id === 'number' &&
        'jugador1' in partido && Tenista.isTenista(partido.jugador1) &&
        'jugador2' in partido && Tenista.isTenista(partido.jugador2) &&
        'ganador' in partido && Tenista.isTenista(partido.ganador) &&
        'sets' in partido && typeof partido.sets === 'object' &&
        partido.sets.every((set: any) => typeof set === 'object') &&
        (partido.jugador1.id == partido.ganador.id || partido.jugador1.id == partido.ganador.id)
      )
    }
}
