import { Component, OnInit } from '@angular/core';
import { User } from 'app/interfaces/user.interface';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styles: []
})
export class UserEditComponent implements OnInit {
  roles: string[] = [];
  authority: string;
  role: any= [];
  user: User = {
    username: null,
    email: null,
    password: null,

  };
  user2: User = {
    username: null,
    email: null,
    password: null,

  };
  id: number;
  seActualizo = false;
  emailFormArray: Array<any> = [];
  categories = [
    {name : 'admin', id: 1},
    {name : 'gobernacion', id: 2},
    {name : 'upf', id: 3},
    {name : 'complejo', id: 4}
  ];

  onChange(email:string, isChecked: boolean) {
      if(isChecked) {
        this.emailFormArray.push(email);
      } else {
        let index = this.emailFormArray.indexOf(email);
        this.emailFormArray.splice(index,1);
      }
      this.role = this.emailFormArray;
  }

  constructor(private _userService: UserService, private route: ActivatedRoute, private router: Router ) { 
    this.route.params
      .subscribe(
      (parametros) => {
        this.id = parametros['id']

        let ide : number = this.id;
        console.log("el id es este numero" , ide);
        console.log(this.id)
        if(ide > 0){
          console.log("es distinto de 0")

          this._userService.getUserForId(this.id)
            .subscribe(data => this.user = data)
        }

      });
  }

  ngOnInit() {
  }

  guardar(){
    this._userService.getUserForId(this.id)
            .subscribe(data => this.user2 = data);
            //this.user2.password = 
    console.log("esta actualizando");
      this.user.roles = this.role;
      console.log("esto es el rol", this.user.roles );
      console.log('el usuario es', this.user);
      this._userService.actualizarUser(this.user2, this.id)
        .subscribe(data =>{
          this.seActualizo=true;
          console.log('el usuario es cuando pasa la actualizacion', this.user);
          console.log(data);

      },
      error => {console.error(error)
        console.log('el usuario es en el error', this.user);
      }
      );
  }

}
