import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemsService } from '../services/items.service';
import {Item} from '../interfaces/item.interface';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styles: []
})
export class ItemsComponent implements OnInit {
  roles: string[] = [];
  authority: string;
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
    type_gast: ''
    //type: 'multipart/form-data'

  };
  fileToUpload: File = null;

  info: any;
  nuevo: boolean = false;
  id: number;
  id1: string;
  id2: string;
  seCreo:boolean = false;
  seActualizo:boolean = false;


  model: any = {};
  constructor(private location: Location, private _itemsService: ItemsService, private router: Router, private route: ActivatedRoute,
    private token: TokenStorageService) {



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

  guardarItem(){

    if( this.id2 === '0' ){
      console.log('este es el item', this.item)

      this._itemsService.nuevoItem(this.item, this.id1, this.fileToUpload)
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

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
}

}
