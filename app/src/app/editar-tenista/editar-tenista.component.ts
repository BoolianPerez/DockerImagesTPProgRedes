import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Tenista } from '../tenista/tenista';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.server';
import { Titulo } from '../tenista/titulo';
import { error } from 'node:console';

type TipoRecord= Record<Titulo, number> | null;
@Component({
  selector: 'app-editar-tenista',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './editar-tenista.component.html',
  styleUrl: './editar-tenista.component.css'
})
export class EditarTenistaComponent {
  jsonData: any;
  tenista: Tenista = new Tenista();
  tenistaForm: FormGroup;
  apiserivce: ApiService = new ApiService(this.http);
  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    
    this.tenistaForm = this.formBuilder.group({
      nombre: '',
      peso:  Number(''),
      altura:  Number(''),
      edad:  Number(''),
      perfilATP: '',
      pais: '',
      titulosAtp: Number(''),
      titulosChall: Number('') 
    });
  }
  onSubmit(){
    console.log("Subiendo tenista");
    this.convertirTenistaFormATenista();
    this.apiserivce.addTenista(this.tenista).subscribe(data => {
      console.log(data);
    });
  }
  

  convertirTenistaFormATenista(){
    let titulos: Record<string, number> = {
      "ATP": (this.tenistaForm.get('titulosAtp')?.value),
      "Challenger": (this.tenistaForm.get('titulosChall')?.value)
    };
    console.log(this.tenistaForm.get('nombre')?.value)
    this.tenista.nombre = (this.tenistaForm.get('nombre')?.value);
    this.tenista.peso = (this.tenistaForm.get('peso')?.value);
    this.tenista.altura = (this.tenistaForm.get('altura')?.value);
    this.tenista.edad = (this.tenistaForm.get('edad')?.value);
    this.tenista.perfilATP = (this.tenistaForm.get('perfilATP')?.value);
    this.tenista.pais = (this.tenistaForm.get('pais')?.value);
    this.tenista.titulos=titulos;
  }
}
