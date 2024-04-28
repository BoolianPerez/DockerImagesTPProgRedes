import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { Tenista } from './tenista/tenista';
  
@Injectable({ 
    providedIn: 'root'
}) 
export class ApiService { 
    constructor(private http: HttpClient) { } 
    getTenistas() { 
        return this.http.get( 
            'http://localhost:3000/api/tenistas'); 
    }
    getTenista(id: number){
        return this.http.get(
            'http://localhost:3000/api/tenistas?id='+id
        )
    }
    addTenista(tenista: Tenista){
        console.log(tenista)
        return this.http.post(
            'http://localhost:3000/api/tenistas', tenista
        )
    }
    modificarTenista(id: number, tenista: Tenista){
        return this.http.patch(
            'http://localhost:3000/api/tenistas?id='+id, tenista
        )
    }
    eliminarTenista(id: number){
        return this.http.delete(
            'http://localhost:3000/api/tenistas?id='+id
        )
    }
    getPartidos(){
        return this.http.get(
            'http://localhost:3000/api/partidos');
    }
    getPartido(id: number){
        return this.http.get(
            'http://localhost:3000/api/partidos?id='+id
        )
    }
    addPartido(partido: any){
        return this.http.post(
            'http://localhost:3000/api/partidos', partido
        )
    }
    modificarPartido(id: any, partido: any){
        return this.http.patch(
            'http://localhost:3000/api/partidos?id='+id, partido
        )
    }
    eliminarPartido(id: number){
        return this.http.delete(
            'http://localhost:3000/api/partidos?id='+id
        )
    }
    
}