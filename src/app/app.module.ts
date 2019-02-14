import { httpInterceptorProviders } from './auth/auth-interceptor.service';
import { ExportexcelService } from './services/exportexcel.service';
import { UserService } from './services/user.service';
import { PresupuestosService } from './services/presupuestos.service';
import { ItemsService } from './services/items.service';
import { RemesasService } from './services/remesas.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Ng2Rut } from 'ng2-rut';
import { AuthService } from './auth/auth.service';
import { TokenStorageService } from './auth/token-storage.service';
import { AuthGuardService } from './guard/auth-guard.service';
import { UploadfileService } from './services/uploadfile.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';




import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';


import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './remesas/remesas.component';
import { TypographyComponent } from './presupuestos/presupuestos.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { RemesaComponent } from './remesas/remesa.component';
import { RemesadetailComponent } from './remesas/remesadetail.component';
import { ItemsComponent } from './items/items.component';
import { PresupuestoComponent } from './presupuestos/presupuesto.component';
import { PresupuestopapeleraComponent } from './presupuestos/presupuestopapelera.component';
import { RemesapapeleraComponent } from './remesas/remesapapelera.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PaneladministracionComponent } from './paneladministracion/paneladministracion.component';
import { PaneladmineditComponent } from './paneladministracion/paneladminedit.component';
import { DetailsUploadComponent } from './upload/details-upload.component';
import { FormUploadComponent } from './upload/form-upload.component';
import { UserEditComponent } from './user-profile/user-edit.component';

import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';



























@NgModule({
  imports: [
    BrowserAnimationsModule,
    Ng2Rut,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,

  ],
  providers: [RemesasService, ItemsService, PresupuestosService, ExportexcelService, UserService, httpInterceptorProviders, AuthService,
     TokenStorageService, AuthGuardService, UploadfileService, {provide: LocationStrategy, useClass: HashLocationStrategy} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
