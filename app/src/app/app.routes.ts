import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EditarPartidoComponent } from './editar-partido/editar-partido.component';
import { EditarTenistaComponent } from './editar-tenista/editar-tenista.component';
import { InicioComponent } from './inicio/inicio.component';
import { BuscarPartidoComponent } from './buscar-partido/buscar-partido.component';
import { BuscarTenistaComponent } from './buscar-tenista/buscar-tenista.component';
import { TenistaComponent } from './tenista/tenista.component';
import { PartidoComponent } from './partido/partido.component';
import { ModificarPartidoComponent } from './modificar-partido/modificar-partido.component';
import { ModificarTenistaComponent } from './modificar-tenista/modificar-tenista.component';

export const routes: Routes = [
    {  
        path: '', // al no poner ruta, arranca mostrandose el componente
        component: InicioComponent,
        title: 'Pagina Inicio'
    },
    {  
        path: 'editarPartidos',
        component: EditarPartidoComponent,
        title: 'Editar Partidos'
    },
    {  
        path: 'editarTenista', 
        component: EditarTenistaComponent,
        title: 'Editar Tenistas'
    },
    {
        path: 'buscarTenista',
        component: BuscarTenistaComponent,
        title: 'Buscar Tenista'
    },
    {
        path: 'buscarPartido',
        component: BuscarPartidoComponent,
        title: 'Buscar Partido'
    },
    {
        path: 'partidos/:id',
        component: PartidoComponent,
        title: 'Partido'
    },
    {
        path: 'tenistas/:id',
        component: TenistaComponent,
        title: 'Tenista'
    },
    {
        path: 'modificarTenista/:id',
        component: ModificarTenistaComponent,
        title: 'Modificar Tenista'
    },
    {
        path: 'modificarPartido/:id',
        component: ModificarPartidoComponent,
        title: 'Modificar Partido'
    }

];

export default routes;