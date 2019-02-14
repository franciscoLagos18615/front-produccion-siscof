import { Headers, Http } from '@angular/http';

import { Injectable } from '@angular/core';
import { Presupuesto } from '../interfaces/presupuesto.interface';
import {map} from 'rxjs/operators';

@Injectable()
export class PresupuestosService {
  presupuestosURL = 'http://142.93.113.147:8080/api/budget/new';
  presupuestoURL = 'http://142.93.113.147:8080/api/budget/';
  presupuestosAll = 'http://142.93.113.147:8080/api/budget/all';
  presupuestosAllActive = 'http://142.93.113.147:8080/api/budget/allActive';
  presupuestosAllInactive = 'http://142.93.113.147:8080/api/budget/allInactive';

  seCreo: boolean = false;
  constructor(private http: Http) { }

  //metodo que crea un nuevo presupuesto
  nuevoPresupuesto(presupuesto: Presupuesto) {
    let body = JSON.stringify(presupuesto);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
   return this.http.post(this.presupuestosURL, body, { headers})
       .pipe(
         map(res => {
           console.log(res.json());
           return res.json(); }
           ));
   }

   //metodo que actualiza el presupuesto
   actualizarPresupuesto(presupuesto: Presupuesto, id_budget$: number) {
    let body = JSON.stringify(presupuesto);
    let headers = new Headers({
      'Content-Type':'application/json'
    });
    let url = `${this.presupuestoURL}${id_budget$}`;
   return this.http.put(url, body, { headers})
       .pipe(
         map(res => {
           console.log(res);
           return res; }
           ));

  }

  //metodo que obtiene un presupuesto
  getPresupuesto(id_budget$: number){
    let url = `${this.presupuestoURL}${id_budget$}`;
    return this.http.get(url)
      .pipe(
        map(
          res => res.json()
        )
      );
  }
  //metodo que obtiene todo los presupuestos
  getPresupuestos(){
    return this.http.get(this.presupuestosAllActive)
      .pipe(
        map(res=>res.json() )
      );
  }

  //metodo que obtiene los presupuestos inactivos
  getPresupuestosInactivos() {
    return this.http.get(this.presupuestosAllInactive)
      .pipe(
        map(res => res.json())
      );
  }

  //metodo que borra un presupuesto

  borrarPresupuesto(id_budget$:number){

    let url = `${ this.presupuestoURL}${id_budget$}`;
    console.log("aquii",url);
    return this.http.delete(url).subscribe(
      res=>{
        this.getPresupuestos();
      }
    )
  }

}
