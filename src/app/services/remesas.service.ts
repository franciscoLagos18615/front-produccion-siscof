import { Remesa } from './../interfaces/remesa.interface';
import { Injectable } from '@angular/core';

import {Http, Headers} from '@angular/http';

import {map} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class RemesasService {

  remesasURL = 'http://142.93.113.147:8080/api/consignment/new';
  remesaURL = 'http://142.93.113.147:8080/api/consignment/';
  remesasAll = 'http://142.93.113.147:8080/api/consignment/all';
  remesasAllActive = 'http://142.93.113.147:8080/api/consignment/allActive';
  remesasAllInactive = 'http://142.93.113.147:8080/api/consignment/allInactive';



  seCreo: boolean=false;
  constructor( private http: Http ) { }

  nuevaRemesa(remesa: Remesa) {
    let body = JSON.stringify(remesa);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
   return this.http.post(this.remesasURL, body, { headers})
       .pipe(
         map(res => {
           console.log(res.json());
           return res.json(); }
           ));
   }


   actualizarRemesa(remesa: Remesa, id_consignment$: number) {
    let body = JSON.stringify(remesa);
    let headers = new Headers({
      'Content-Type':'application/json'
    });
    let url = `${this.remesaURL}${id_consignment$}`;
   return this.http.put(url, body, { headers})
       .pipe(
         map(res => {
           console.log(res);
           return res; }
           ));

  }


//metodo que obtiene una remesa
   getRemesa(id_consignment$: number){
     let url = `${this.remesaURL}${id_consignment$}`;
     return this.http.get(url)
       .pipe(
         map(
           res => res.json()
         )
       );
   }

//REMESAS ACTIVAS
   getRemesas(){
    return this.http.get(this.remesasAllActive)
      .pipe(
        map(res=>res.json() )
      );
  }
//METODO QUE EXTRAE LAS REMESAS INACTIVAS

getPresupuestosInactivos() {
  return this.http.get(this.remesasAllInactive)
    .pipe(
      map(res => res.json())
    );
}


  borrarRemesa(id_consignment$:number){

    let url = `${ this.remesaURL}${id_consignment$}`;
    console.log("aquii",url);
    return this.http.delete(url).subscribe(
      res=>{
        this.getRemesas();
      }
    )
  }

  //method that return total sum money consignment in relationship items
  getSumaConsignment(id_consignment$: number){
    //http://localhost:8080/api/consignment/127/total
    let url = `${this.remesaURL}${id_consignment$}/total`;
     return this.http.get(url)
       .pipe(
         map(
           res => {
             console.log("la suma es: ",res);


          }

         )
       );

  }

}
