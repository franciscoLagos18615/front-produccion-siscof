import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../auth/token-storage.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  usuarios: any[] = [];
  info: any;
  roles: string[] = [];
  authority: string;

  constructor(private userService: UserService, private token: TokenStorageService ) {
    this.userService.getUser(this.token.getUsername())
    .subscribe(data => {
      console.log(data);
      this.usuarios = data;

      });

   }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
  }

}
