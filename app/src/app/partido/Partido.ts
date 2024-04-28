import { Tenista } from "../tenista/tenista";
import { SetTenis } from "./Sets";

export class Partido{
    id: number;
    jugador1: Tenista;
    jugador2: Tenista;
    ganador: Tenista;
    sets: SetTenis[];
    constructor(){
        this.id = 0;
        this.jugador1 = new Tenista();
        this.jugador2 = new Tenista();
        this.sets = [];
        this.ganador = new Tenista();
    }
}