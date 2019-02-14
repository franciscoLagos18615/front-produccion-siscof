import { Http, Headers } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { RemesasService } from '../services/remesas.service';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { Remesa } from 'app/interfaces/remesa.interface';
import { TokenStorageService } from '../auth/token-storage.service';


@Component({
  selector: 'app-table-list',
  templateUrl: './remesas.component.html',
})
export class TableListComponent implements OnInit {
  roles: string[] = [];
  authority: string;
  remesas: any[] = [];
  info: any;

  constructor(private _remesasService: RemesasService, private router: Router, private http: Http, 
    private token: TokenStorageService) { 
    this._remesasService.getRemesas()
        .subscribe(data => {
          console.log(data);
          this.remesas = data;

          });
        }

  ngOnInit() {
    this.allRemesas()
    if (this.token.getToken()) {
      this.roles = this.token.getAuthorities();
      this.roles.every(role => {
      if(this.roles[1] === 'ROLE_ADMIN' && this.roles[0] === 'ROLE_UPF'){
              this.authority='admin';
              return false;
          }
       else if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        }
        else if (role === 'ROLE_UPF') {
          this.authority = 'upf';
          return false;
        }
        else if (role === 'ROLE_GOBERNACION') {
          this.authority = 'gobernacion';
          return false;
        }
        this.authority = 'complejo';
        return true;
      });
    }

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };

  }

  //metodo que refresca la pagina 
  refresh() {
    setTimeout(() => {
      window.location.reload();
    }, ); // Activate after 5 minutes.
  }

//metodo que extrae todas las remesas
  allRemesas(){
    this._remesasService.getRemesas()
      .subscribe(data =>{
        this.remesas = data;
      });
  }

  //metodo para borrar una remesa
  borraRemesa(key$: number){

    //this._remesasService.borrarRemesa(key$)
    let remesaURL = 'http://142.93.113.147:8080/api/consignment/'
    let url = `${remesaURL}${key$}`;
    console.log("aquii",url);
    if(window.confirm('¿Esta seguro que desea Eliminar esta remesa ?')){
      //put your delete method logic here
      return this.http.delete(url).subscribe(
        ()=>{
          this.allRemesas();
        }
      )
     }
  }

  //metodo para cambiar estado de la remesa
  
  cambiarEstado(remesa: Remesa, id1: number, estado: string) {
    let consignmentURL= 'http://142.93.113.147:8080/api/consignment/'
    let body = JSON.stringify(remesa);
    let headers = new Headers({
      'Content-Type':'application/json'
    });
    let url = `${consignmentURL}${id1}/${estado}`;
    console.log("url del boton inactivar consignment",url);
    if(estado == 'inactivo'){
      if (window.confirm('¿Esta Seguro que desea enviar a la papelera la remesa?')){
        return this.http.put(url, body, { headers})
          .subscribe(
            data =>{
              console.log(data)
              this.refresh();
            }
          )

       }

    }



  }


}
