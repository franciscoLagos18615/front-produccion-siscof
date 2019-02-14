import { Router } from '@angular/router';
import { PresupuestosService } from './../services/presupuestos.service';
import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Presupuesto } from '../interfaces/presupuesto.interface';
import { TokenStorageService } from '../auth/token-storage.service';



@Component({
  selector: 'app-typography',
  templateUrl: './presupuestos.component.html',
  styles: []
})


export class TypographyComponent implements OnInit {
  roles: string[] = [];
  authority: string;
  presupuestos: any[] = [];
  presupuesto: Presupuesto;
  info: any;

  constructor(private _presupuestosService: PresupuestosService, private router: Router, private http: Http ,
    private token: TokenStorageService) { 
    this._presupuestosService.getPresupuestos()
      .subscribe(data => {
        console.log(data);
        this.presupuestos = data;

        });

  }

  ngOnInit() {
    this.allPresupuestos()
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

  //metodo que refresca la pagina despues de actualizar el estado del item(aprobado o rechazado)

  refresh() {
    setTimeout(() => {
      window.location.reload();
    }, ); // Activate after 5 minutes.
  }


  allPresupuestos(){
    this._presupuestosService.getPresupuestos()
      .subscribe(data =>{
        this.presupuestos = data;
      });
  }

  //metodo para borrar una remesa
  borraPresupuesto(key$: number){

    //this._remesasService.borrarRemesa(key$)
    let presupuestoURL = 'http://142.93.113.147:8080/api/budget/'
    let url = `${presupuestoURL}${key$}`;
    console.log("aquii",url);
    if(window.confirm('¿Estas seguro que desea Eliminar este presupuesto ?')){
      //put your delete method logic here
      return this.http.delete(url).subscribe(
        ()=>{
          this.allPresupuestos();
        }
      )
     }
  }

  //http://142.93.113.147:8080/api/budget/128/activo
  cambiarEstado(presupuesto: Presupuesto, id1: number, estado: string) {
    let budgetURL= 'http://142.93.113.147:8080/api/budget/'
    let body = JSON.stringify(presupuesto);
    let headers = new Headers({
      'Content-Type':'application/json'
    });
    let url = `${budgetURL}${id1}/${estado}`;
    console.log("url del boton inactivar budget",url);
    if(estado == 'inactivo'){
      if (window.confirm('¿Esta Seguro que desea enviar a la papelera el presupuesto?')){
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
