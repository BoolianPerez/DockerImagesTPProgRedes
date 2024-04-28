import { Titulo } from '../enums/Titulo'

export class Tenista implements dataObject{
    static PATH = "tenistas.json"  
    id: number;
    nombre: string;
    peso: number; // KG
    altura: number; // M
    edad: number;
    perfilATP: string;
    pais: string;
    titulos: Record<Titulo, number> | null;

    constructor (
        id: number,
        nombre: string,
        peso: number,
        altura: number,
        edad: number,
        perfilATP: string,
        pais: string,
        titulos: Record<Titulo, number> | null 
      ) {
        this.id = id
        this.nombre = nombre
        this.peso = peso
        this.altura = altura
        this.edad = edad
        this.perfilATP = perfilATP
        this.pais = pais
        this.titulos = titulos
      }

    static isTenista(tenista: any): boolean{
      return(
        typeof tenista === 'object' &&
        'id' in tenista && typeof tenista.id === 'number' &&
        'nombre' in tenista && typeof tenista.nombre === 'string' &&
        'peso' in tenista && typeof tenista.peso === 'number' &&
        'altura' in tenista && typeof tenista.altura === 'number' &&
        'edad' in tenista && typeof tenista.edad === 'number' &&
        'perfilATP' in tenista && typeof tenista.perfilATP === 'string' &&
        'pais' in tenista && typeof tenista.pais == 'string' &&
        'titulos' in tenista &&
            (tenista.titulos === null || typeof tenista.titulos === 'object')
      )
    }
}
