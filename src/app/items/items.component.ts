import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemsService } from '../services/items.service';
import {Item} from '../interfaces/item.interface';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styles: []
})
export class ItemsComponent implements OnInit {

  item: Item = {
    bill_number: null,
    budget_item: '',
    detail: '',
    money: null,
    name_item: '',
    provider: '',
    purchase_order: '',
    resolution: null,
    rut: '',
    status: 'Por revisar',
    type_gast: '',

  };

  nuevo: boolean = false;
  id: number;
  id1: string;
  id2: string;
  seCreo:boolean = false;
  seActualizo:boolean = false;


  model: any = {};
  constructor(private location: Location, private _itemsService: ItemsService, private router: Router, private route: ActivatedRoute) {



    //obtencion de parametros de la url
    this.id1 = this.route.snapshot.paramMap.get("id1")
    this.id2 = this.route.snapshot.paramMap.get("id2");
    console.log(this.id1)
    console.log(this.id2)
    this.route.params
      .subscribe(
      (parametros) => {
        this.id = parametros['id']
        console.log("id del item",this.id)
        if(this.id2 !== '0'){
          console.log("es distinto de 0")

          this._itemsService.getItem( this.id1, this.id2)
            .subscribe(data => this.item = data)
        }


      });

  }

  ngOnInit() {
  }

  guardarItem(){

    if( this.id2 === '0' ){
      console.log('este es el item', this.item)

      this._itemsService.nuevoItem(this.item, this.id1)
      .subscribe(data=>{


      let ruta= `/remesa/${this.id1}/item/${this.id2}`
      console.log("ruta es", ruta)
      this.router.navigateByUrl(ruta);

      this.seCreo=true;

      },
      error => console.error(error));

    }

    else{
      console.log("es edit")
      this._itemsService.actualizarItem(this.item,this.id1, this.id2)
      .subscribe(data =>{
        this.seActualizo=true;

        console.log(data);

    },
    error => console.error(error));
    }



  }

  //boton back
  goBack(): void {
    this.location.back();
  }

}
