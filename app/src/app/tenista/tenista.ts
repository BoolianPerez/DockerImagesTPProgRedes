import { Titulo } from "./titulo";

export class Tenista{
    id: number 
    nombre: string 
    peso: number  // KG
    altura: number  // M
    edad: number 
    perfilATP: string 
    pais: string 
    titulos: Record<string, number> | null 
    constructor(){
        this.id = 0;
        this.nombre = '';
        this.peso = 0;
        this.altura = 0;
        this.edad = 0;
        this.perfilATP = '';
        this.pais = '';
        this.titulos = null;
    }
}