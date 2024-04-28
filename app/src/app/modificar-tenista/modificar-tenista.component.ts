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
@Component({
  selector: 'app-modificar-tenista',
  standalone: true,
  imports: [CommonModule, NgFor, NgComponentOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './modificar-tenista.component.html',
  styleUrl: './modificar-tenista.component.css'
})
export class ModificarTenistaComponent {
  jsonData: any;
  apiservice: ApiService= new ApiService(this.http);
  id: number
  tenista: Tenista = new Tenista();
  tenistaForm: FormGroup;
  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute, private formBuilder: FormBuilder) { this.id=0
    this.route.params.subscribe(params=>{
      this.id=params['id']
      console.log(this.id)
      this.getTenista(this.id);
    }) 
    this.tenistaForm = this.formBuilder.group({
      id : Number(''),
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
    
  modificar(){
    console.log("Modificando tenista");
    this.convertirTenistaFormATenista();
    console.log(this.tenista);
    this.apiservice.modificarTenista(this.tenista.id, this.tenista).subscribe(data => {
      console.log(data);
    });

  }
  convertirTenistaFormATenista(){
    let titulos: Record<string, number> = {
      "ATP": (this.tenistaForm.get('titulosAtp')?.value),
      "Challenger": (this.tenistaForm.get('titulosChall')?.value)
    };
    this.tenista.id = (this.tenistaForm.get('id')?.value);
    this.tenista.nombre = (this.tenistaForm.get('nombre')?.value);
    this.tenista.peso = (this.tenistaForm.get('peso')?.value);
    this.tenista.altura = (this.tenistaForm.get('altura')?.value);
    this.tenista.edad = (this.tenistaForm.get('edad')?.value);
    this.tenista.perfilATP = (this.tenistaForm.get('perfilATP')?.value);
    this.tenista.pais = (this.tenistaForm.get('pais')?.value);
    this.tenista.titulos=titulos;
  }
  getTenista(id: number){
    this.apiservice.getTenista(id).subscribe((data: any) =>{
      this.jsonData=data;
      console.log(this.jsonData)
      this.tenistaForm.patchValue({
        id: this.jsonData.id,
        nombre: this.jsonData.nombre,
        peso: this.jsonData.peso,
        altura: this.jsonData.altura,
        edad: this.jsonData.edad,
        perfilATP: this.jsonData.perfilATP,
        pais: this.jsonData.pais,
        titulosAtp: this.jsonData.titulos.ATP,
        titulosChall: this.jsonData.titulos.Challenger
      });
    });
  }
}
