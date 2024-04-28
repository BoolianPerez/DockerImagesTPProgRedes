import { Titulo } from '../../src/classes/enums/Titulo'
import { Tenista } from '../../src/classes/dataClasses/Tenista'
import { Partido } from '../../src/classes/dataClasses/Partido'
import { SetTenis } from '../../src/classes/other/SetTenis'


const id1 = 5
const nombre1 = "Linga"
const peso1 = 22
const altura1 = 190
const edad1 = 33
const perfilATP1 = "http:/mocklink.com/linga/stats"
const pais1 = "Argentina"
const titulos1: Record<Titulo, number> = {
    [Titulo.ATP]:  2,
    [Titulo.Challenger]: 0,
}
export const testTenista1 = new Tenista(id1, nombre1, peso1, altura1, edad1, perfilATP1, pais1, titulos1)


const id2 = 6
const nombre2 = "Der"
const peso2 = 231
const altura2 = 23
const edad2 = 111
const perfilATP2 = "http:/mocklink.com/Der/stats"
const pais2 = "Sudan"
const titulos2: Record<Titulo, number> = {
    [Titulo.ATP]:  0,
    [Titulo.Challenger]: 0,
}
export const testTenista2 = new Tenista(id2, nombre2, peso2, altura2, edad2, perfilATP2, pais2, titulos2)
    
const id3 = 3;
const nombre3 = "Roger Federer";
const peso3 = 85;
const altura3 = 1.85;
const edad3 = 40;
const perfilATP3 = "https://www.atptour.com/en/players/roger-federer/f324/overview";
const pais3 = "Switzerland";
const titulos3: Record<Titulo, number> = {
    [Titulo.ATP]:  20,
    [Titulo.Challenger]: 28,
};
export const testTenista3 = new Tenista(id3, nombre3, peso3, altura3, edad3, perfilATP3, pais3, titulos3);

const id4 = 4;
const nombre4 = "Andy Murray";
const peso4 = 84;
const altura4 = 1.91;
const edad4 = 34;
const perfilATP4 = "https://www.atptour.com/en/players/andy-murray/mc10/overview";
const pais4 = "United Kingdom";
const titulos4: Record<Titulo, number> = {
    [Titulo.ATP]:  3,
    [Titulo.Challenger]: 14,
};
export const testTenista4 = new Tenista(id4, nombre4, peso4, altura4, edad4, perfilATP4, pais4, titulos4);

const sets1: SetTenis[] = [
    new SetTenis(6, 3),
    new SetTenis(7, 6),
    new SetTenis(6, 4),
];
export const testPartido1 = new Partido(4, testTenista1, testTenista2, testTenista1, sets1)

const sets2: SetTenis[] = [
    new SetTenis(6, 3),
    new SetTenis(7, 6),
    new SetTenis(6, 4),
];

export const testPartido2 = new Partido(3, testTenista3, testTenista4, testTenista3, sets2)