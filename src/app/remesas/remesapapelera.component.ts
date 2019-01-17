import { Http, Headers } from '@angular/http';
import { RemesasService } from './../services/remesas.service';
import { Component, OnInit } from '@angular/core';
import { Remesa } from 'app/interfaces/remesa.interface';
import { Router } from '@angular/router';
import { TokenStorageService } from 'app/auth/token-storage.service';

@Component({
  selector: 'app-remesapapelera',
  templateUrl: './remesapapelera.component.html',
  styles: []
})
export class RemesapapeleraComponent implements OnInit {
  roles: string[] = [];
  authority: string;
  remesas: any[] = [];
  remesa: Remesa;
  info: any;
  constructor(private _remesasService: RemesasService, private router: Router, private http: Http, private token: TokenStorageService) { 
    this._remesasService.getPresupuestosInactivos()
      .subscribe( data =>{
        console.log(data);
        this.remesas = data;
      }

      )
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

  refresh() {
    setTimeout(() => {
      window.location.reload();
    }, ); // Activate after 5 minutes.
  }
  //metodo que obtiene todos las remesas inactivos
  allRemesas(){
    this._remesasService.getPresupuestosInactivos()
      .subscribe(data =>{
        this.remesas = data;
      });
  }

  //metodo para borrar una remesa
  borraRemesa(key$: number) {

    let remesaUrl = 'http://localhost:8080/api/consignment/'
    let url = `${remesaUrl}${key$}`;
    console.log("metodo que elimina la remesa",url);
    if (window.confirm('¿Estas seguro que desea Eliminar esta remesa ?')) {
      //put your delete method logic here
      return this.http.delete(url).subscribe(
        ()=>{
          this.allRemesas();
        }
      )
     }
  }//fin metodo borrar


  //metodo que cambia el estado de la remesa
  cambiarEstado(remesa: Remesa, id1: number, estado: string) {
    let remesaURL= 'http://localhost:8080/api/consignment/'
    let body = JSON.stringify(remesa);
    let headers = new Headers({
      'Content-Type':'application/json'
    });
    let url = `${remesaURL}${id1}/${estado}`;
    console.log("url del boton activar remesa",url);
    if(estado == 'activo'){
      if (window.confirm('¿Esta Seguro que desea activar la remesa?')){
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
