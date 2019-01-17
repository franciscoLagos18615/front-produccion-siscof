import { Component, OnInit } from '@angular/core';
import { UploadfileService } from '../services/uploadfile.service';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form-upload',
  templateUrl: './form-upload.component.html',
  styles: []
})
export class FormUploadComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  id: number;
  info: any;
  roles: string[] = [];
  authority: string;

  constructor(private uploadService: UploadfileService, private router: Router, private route: ActivatedRoute,
    private token: TokenStorageService, private location: Location) {

      this.route.params
      .subscribe(
      (parametros) => {
        this.id = parametros['id']

        let ide: number = this.id;
        console.log("el id es este numero" , ide);
        console.log(this.id)
        if(ide > 0){
          console.log("es distinto de 0")

          //this._remesasService.getRemesa(this.id)
            //.subscribe(data => this.remesa = data)
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
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });

    this.selectedFiles = undefined;
  }
  //boton back
  goBack(): void {
    this.location.back();
  }


}
