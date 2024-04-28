import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Partido } from '../partido/Partido';
import { ApiService } from '../api.server';
import { HttpClient } from '@angular/common/http';
import { Tenista } from '../tenista/tenista';
import { Titulo } from '../tenista/titulo';
import { Observable, forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SetTenis } from '../partido/Sets';

@Component({
  selector: 'app-editar-partido',
  standalone: true,
  imports: [NavBarComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './editar-partido.component.html',
  styleUrl: './editar-partido.component.css'
})
export class EditarPartidoComponent {
  jsonData: any;
  partido: Partido = new Partido();
  partidoForm: FormGroup;
  apiserivce: ApiService = new ApiService(this.http);
  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    
    this.partidoForm = this.formBuilder.group({
      id1: Number(''),
      id2: Number(''),
      id3: Number(''),
      ResJ1Set1: Number(''),
      ResJ2Set1: Number(''),
      ResJ1Set2: Number(''),
      ResJ2Set2: Number(''),
      ResJ1Set3: Number(''),
      ResJ2Set3: Number(''),
      ResJ1Set4: Number(''),
      ResJ2Set4: Number(''),
      ResJ1Set5: Number(''),
      ResJ2Set5: Number('')
    });
  }
  async onSubmit(){
    console.log("Subiendo partido");
    await this.convertirPartidoFormAPartido();
    this.apiserivce.addPartido(this.partido).subscribe(data => {
      console.log(data);
    });
  }
  async convertirPartidoFormAPartido(){
    const id1$ = this.fetchTenista('id1').pipe(
      tap(data => {
        console.log(data);
        this.partido.jugador1 = data;
      })
    );
    const id2$ = this.fetchTenista('id2').pipe(
      tap(data => {
        console.log(data);
        this.partido.jugador2 = data;
      })
    );
    const id3$ = this.fetchTenista('id3').pipe(
      tap(data => {
        console.log(data);
        this.partido.ganador = data;
      })
    );
    await forkJoin([id1$, id2$, id3$]).toPromise();
    this.partido.sets = this.generarSets();
  }
  fetchTenista(id: string) : Observable<Tenista>{
    return this.apiserivce.getTenista(this.partidoForm.get(id)?.value).pipe(
      map(data => this.mapJsonToTenista(data))
    );
    
  }
  private generarSets(): any{
    let sets: SetTenis[] = [];
    console.log(sets)
    for (let i = 1; i <= 5; i++) {
      let aux: SetTenis = new SetTenis();
      aux.puntaje1 = this.partidoForm.get('ResJ1Set' + i)?.value;
      aux.puntaje2 = this.partidoForm.get('ResJ2Set' + i)?.value;
      sets.push(aux);
    }
    return sets
  }
  private mapJsonToTenista(data: any): Tenista {
    // Create a new instance of Tenista and map the JSON data to it
    const tenista = new Tenista();
    tenista.id = data.id;
    tenista.nombre = data.nombre;
    tenista.peso = data.peso;
    tenista.altura = data.altura;
    tenista.edad = data.edad;
    tenista.perfilATP = data.perfilATP;
    tenista.pais = data.pais;
    tenista.titulos = data.titulos;
    return tenista;
  }
}
