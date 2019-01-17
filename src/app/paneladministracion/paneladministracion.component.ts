import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-paneladministracion',
  templateUrl: './paneladministracion.component.html',
  styleUrls: []
})
export class PaneladministracionComponent implements OnInit {
  usuarios: any[] = [];
  info: any;
  segundoRol: boolean = false;
  roles: string[] = [];
  authority: string;

  constructor(private userService: UserService, private token: TokenStorageService) { 
    this.userService.getAllUser()
    .subscribe(data => {
      console.log(data);
      this.usuarios= data;

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

}
