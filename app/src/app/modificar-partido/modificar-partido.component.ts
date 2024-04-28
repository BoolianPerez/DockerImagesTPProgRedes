import { Component, Inject, InjectorType, Input, NgModule, OnInit, input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.server';
import { HttpClient } from '@angular/common/http';
import { NgComponentOutlet } from '@angular/common';
import { inject } from '@angular/core';
import { Tenista } from '../tenista/tenista';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Partido } from '../partido/Partido';
import { SetTenis } from '../partido/Sets';
import { Observable, forkJoin, map, tap } from 'rxjs';

@Component({
  selector: 'app-modificar-partido',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './modificar-partido.component.html',
  styleUrl: './modificar-partido.component.css'
})
export class ModificarPartidoComponent {
  jsonData: any;
  partido: Partido = new Partido();
  partidoForm: FormGroup;
  apiservice: ApiService= new ApiService(this.http);
  id: number
  constructor(private http: HttpClient, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.id = 0;
    this.route.params.subscribe(params=>{
      this.id=params['id']
      console.log(this.id)
      this.getPartido(this.id);
    }) 
    this.partidoForm = this.formBuilder.group({
      id0: Number(''),
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
  getPartido(id: any){
    this.apiservice.getPartido(id).subscribe((data: any) =>{
      this.jsonData=data;
      console.log(this.jsonData)
      this.partidoForm.patchValue({
        id0: this.jsonData.id,
        id1: this.jsonData.jugador1.id,
        id2: this.jsonData.jugador2.id,
        id3: this.jsonData.ganador.id,
        ResJ1Set1: this.jsonData.sets[0].puntaje1,
        ResJ2Set1: this.jsonData.sets[0].puntaje2,
        ResJ1Set2: this.jsonData.sets[1].puntaje1,
        ResJ2Set2: this.jsonData.sets[1].puntaje2,
        ResJ1Set3: this.jsonData.sets[2].puntaje1,
        ResJ2Set3: this.jsonData.sets[2].puntaje2,
        ResJ1Set4: this.jsonData.sets[3].puntaje1,
        ResJ2Set4: this.jsonData.sets[3].puntaje2,
        ResJ1Set5: this.jsonData.sets[4].puntaje1,
        ResJ2Set5: this.jsonData.sets[4].puntaje2
      });
      this.convertirPartidoFormAPartido();
    });
  }
  modificar(){
    console.log("Modificando partido");
    this.convertirPartidoFormAPartido();
    console.log(this.partido);
    this.apiservice.modificarPartido(this.partido.id, this.partido).subscribe(data => {
      console.log(data);
    });
  }
  async convertirPartidoFormAPartido(){
    this.partido.id = this.partidoForm.get('id0')?.value;
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
    return this.apiservice.getTenista(this.partidoForm.get(id)?.value).pipe(
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
