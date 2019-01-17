import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { RemesasService } from './../services/remesas.service';
import { Remesa } from './../interfaces/remesa.interface';
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { TokenStorageService } from '../auth/token-storage.service';






@Component({
  selector: 'app-remesa',
  templateUrl: './remesa.component.html',
  styles: []
})
export class RemesaComponent implements OnInit {
  roles: string[] = [];
  authority: string;
  remesa: Remesa = {
    request: '',
    status: 'Realizando',
    governance: '',
    status_bin: 'activo',
    name_user: null,

  };
  info: any;
  nuevo: boolean = false;
  id: number;
  seCreo:boolean = false;
  seActualizo:boolean = false;
  constructor(private _remesasService: RemesasService, private router:Router, private route:ActivatedRoute,
    private token: TokenStorageService  ) { 
    /** */

    this.route.params
      .subscribe(
      (parametros) => {
        this.id = parametros['id']

        let ide : number = this.id;
        console.log("el id es este numero" , ide);
        console.log(this.id)
        if(ide > 0){
          console.log("es distinto de 0")

          this._remesasService.getRemesa(this.id)
            .subscribe(data => this.remesa = data)
        }

      });

  }

  ngOnInit() {
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



  guardar() {
    console.log(this.remesa);

    if(this.id == 0){
      console.log("es post");
      this.remesa.name_user= this.info.username;
      console.log('la remesa creada es ', this.remesa);
      this._remesasService.nuevaRemesa(this.remesa)
      .subscribe(data=>{
        this.router.navigate(['/remesa',this.id]);
        this.seCreo=true;

      },
      error => console.error(error));

    }
    else{
     
      this._remesasService.actualizarRemesa(this.remesa, this.id)
        .subscribe(data =>{
          this.seActualizo=true;
          
          console.log(data);

      },
      error => console.error(error));

    }

  }



}
