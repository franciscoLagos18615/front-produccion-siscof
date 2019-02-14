





import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../remesas/remesas.component';
import { TypographyComponent } from '../../presupuestos/presupuestos.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { RemesaComponent } from '../../remesas/remesa.component';
import { RemesadetailComponent } from '../../remesas/remesadetail.component';
import { ItemsComponent } from './../../items/items.component';
import { PresupuestoComponent } from './../../presupuestos/presupuesto.component';
import { PresupuestopapeleraComponent } from 'app/presupuestos/presupuestopapelera.component';
import { RemesapapeleraComponent } from './../../remesas/remesapapelera.component';
import { RegisterComponent } from '../../register/register.component';
import { LoginComponent } from '../../login/login.component';
import { AuthGuardService } from './../../guard/auth-guard.service';
import { PaneladministracionComponent } from '../../paneladministracion/paneladministracion.component';
import { PaneladmineditComponent } from '../../paneladministracion/paneladminedit.component';
import { FormUploadComponent } from '../../upload/form-upload.component';
import { DetailsUploadComponent } from '../../upload/details-upload.component';
import { UserEditComponent } from '../../user-profile/user-edit.component';






export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'home',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent , canActivate: [AuthGuardService] },
    { path: 'user-profileEdit/:id',   component: UserEditComponent , canActivate: [AuthGuardService] },
    { path: 'register',      component: RegisterComponent},
    { path: 'login',      component: LoginComponent },
    { path: 'remesas',     component: TableListComponent , canActivate: [AuthGuardService] },
    { path: 'remesa/:id',     component: RemesaComponent , canActivate: [AuthGuardService] },
    { path: 'remesaDetail/:id',     component: RemesadetailComponent , canActivate: [AuthGuardService] },
    { path: 'remesaDetail/:id/file',     component: FormUploadComponent , canActivate: [AuthGuardService] },
    { path: 'remesaDetail/:id/fileAll',     component: DetailsUploadComponent , canActivate: [AuthGuardService] },
    { path: 'remesa/:id1/item/:id2',     component: ItemsComponent , canActivate: [AuthGuardService] },
    { path: 'remesaPapelera',     component: RemesapapeleraComponent , canActivate: [AuthGuardService] },
    { path: 'presupuestos',     component: TypographyComponent , canActivate: [AuthGuardService]  },
    { path: 'presupuesto/:id',     component: PresupuestoComponent , canActivate: [AuthGuardService] },
    { path: 'presupuestoPapelera',     component: PresupuestopapeleraComponent, canActivate: [AuthGuardService] },
    { path: 'panelAdministracion',     component: PaneladministracionComponent, canActivate: [AuthGuardService] },
    { path: 'panelAdministracionEdit/:id',     component: PaneladmineditComponent, canActivate: [AuthGuardService] },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
];


