import { Component } from '@angular/core';
import { EditarPartidoComponent } from '../editar-partido/editar-partido.component';
import { EditarTenistaComponent } from '../editar-tenista/editar-tenista.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [EditarPartidoComponent,
  EditarTenistaComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor(private router: Router) { }
  btnClick (route: string) {
    this.router.navigate([route]);
  };
}
