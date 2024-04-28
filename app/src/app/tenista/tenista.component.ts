import { Component, Inject, InjectorType, Input, NgModule, OnInit, input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.server';
import { HttpClient } from '@angular/common/http';
import { NgComponentOutlet } from '@angular/common';
import { inject } from '@angular/core';
import { Tenista } from './tenista';

@Component({
  selector: 'app-tenista',
  standalone: true,
  imports: [CommonModule, NgFor, NgComponentOutlet],
  templateUrl: './tenista.component.html',
  styleUrl: './tenista.component.css'
})
export class TenistaComponent {
  
  jsonData: any;
  apiservice: ApiService= new ApiService(this.http);
  id: number
  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) { this.id=0
    this.route.params.subscribe(params=>{
      this.id=params['id']
      console.log(this.id)
      this.getTenista(this.id);
    }) }
  modificar(id: any){
    console.log("Modificando Tenista")
    this.router.navigate(['/modificarTenista', id])
  }
  eliminarTenista(id: any){
    console.log("Eliminando Tenista")
    this.apiservice.eliminarTenista(id).subscribe(data=>{
      console.log(data);
      this.router.navigate(['/buscarTenista'])
    });
  }
  getTenista(id: number){
    this.apiservice.getTenista(id).subscribe((data: any) =>{
      this.jsonData=data;
      console.log(this.jsonData)
    });
  }
}
