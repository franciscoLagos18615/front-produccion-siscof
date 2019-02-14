import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SignUpInfo } from '../auth/signup-info';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  roles: string[] = [];
  authority: string;
  form: any = {};
  role: any= [];

  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  estaRegistrado = false;
  errorRegistro = false;
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

  constructor(private authService: AuthService , private _route: Router) { }

  ngOnInit() { }

  onSubmit() {
    console.log(this.form);

    this.signupInfo = new SignUpInfo(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password,
      this.role);

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        this.estaRegistrado = true;
        //this.reloadPage();
      },
      error => {
        this.errorRegistro = true;
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
    //this._route.navigate(['/home']);
    //window.location.reload();
  }

}
