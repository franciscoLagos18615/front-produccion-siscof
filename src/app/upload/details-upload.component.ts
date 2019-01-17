import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input } from '@angular/core';
import { UploadfileService } from '../services/uploadfile.service';
import { Route, ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';
import { Location } from '@angular/common';



@Component({
  selector: 'app-details-upload',
  templateUrl: './details-upload.component.html',
  styles: []
})
export class DetailsUploadComponent implements OnInit {
  @Input() fileUpload: string;
  roles: string[] = [];
  authority: string;
  id: number;
  showFile = false;
  fileUploads: Observable<string[]>
  info: any;
  files2: any[]=[];

  constructor(private uploadService: UploadfileService, private route: ActivatedRoute, private token: TokenStorageService,
    private location: Location) { 
    this.route.params
      .subscribe(
      (parametros) => {
        this.id = parametros['id']

        let ide: number = this.id;
        console.log('el id en details upload es:' , ide);
        //console.log(this.id)
        this.uploadService.getFilesForItemId(this.id)
            .subscribe(data => {
              this.files2 = data;
              console.log("estos son los archivos",this.files2);
            });

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

  showFiles(enable: boolean) {
    this.showFile = enable;

    if (enable) {
      this.fileUploads = this.uploadService.getFilesForItemId(this.id);
      //this.files2 = this.uploadService.getFilesForItemId(this.id);
    }
  }

  goBack(): void {
    this.location.back();
  }

}
