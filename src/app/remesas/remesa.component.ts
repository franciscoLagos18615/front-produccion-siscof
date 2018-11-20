import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { RemesasService } from './../services/remesas.service';
import { Remesa } from './../interfaces/remesa.interface';
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';





@Component({
  selector: 'app-remesa',
  templateUrl: './remesa.component.html',
  styles: []
})
export class RemesaComponent implements OnInit {

  remesa: Remesa = {
    request: '',
    status: 'Por Revisar',
    governance: '',
    status_bin: 'activo',

  };

  nuevo: boolean = false;
  id: number;
  seCreo:boolean = false;
  seActualizo:boolean = false;
  constructor(private _remesasService: RemesasService, private router:Router, private route:ActivatedRoute ) { 
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
  }



  guardar() {
    console.log(this.remesa);

    if(this.id == 0){
      console.log("es post");

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
