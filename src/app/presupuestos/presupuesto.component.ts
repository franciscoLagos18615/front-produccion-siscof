import { PresupuestosService } from './../services/presupuestos.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Presupuesto } from '../interfaces/presupuesto.interface';
import { TokenStorageService } from '../auth/token-storage.service';


@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styles: []
})
export class PresupuestoComponent implements OnInit {
  roles: string[] = [];
  authority: string;
  presupuesto: Presupuesto = {
    date: null,
    governance: '',
    budget: null,
    observation: '',
    status: 'activo',

  };

  nuevo: boolean = false;
  id: number;
  seCreo:boolean = false;
  seActualizo:boolean = false;
  info: any;

  constructor(private _presupuestoService: PresupuestosService, private route: ActivatedRoute,private router: Router,
    private token:TokenStorageService ) {

    this.route.params
      .subscribe(
      (parametros) => {
        this.id = parametros['id']

        let ide : number = this.id;
        console.log("el id es este numero" , ide);
        console.log(this.id)
        if(ide > 0){
          console.log("es distinto de 0")

          this._presupuestoService.getPresupuesto(this.id)
            .subscribe(data => this.presupuesto = data)
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

  //metodo guardar
  guardar() {
    console.log(this.presupuesto);

    if(this.id == 0){
      console.log("es post");

      this._presupuestoService.nuevoPresupuesto(this.presupuesto)
      .subscribe(data=>{
        this.router.navigate(['/presupuesto', this.id]);
        this.seCreo=true;

      },
      error => console.error(error));

    }
    else{
      console.log("esta actualizando");
      this._presupuestoService.actualizarPresupuesto(this.presupuesto, this.id)
        .subscribe(data =>{
          this.seActualizo=true;
          console.log(data);

      },
      error => console.error(error));

    }

  }

}
