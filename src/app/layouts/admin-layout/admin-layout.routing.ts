



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
    { path: 'register',      component: RegisterComponent },
    { path: 'login',      component: LoginComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'remesas',     component: TableListComponent },
    { path: 'remesa/:id',     component: RemesaComponent },
    { path: 'remesaDetail/:id',     component: RemesadetailComponent },
    { path: 'remesa/:id1/item/:id2',     component: ItemsComponent },
    { path: 'remesaPapelera',     component: RemesapapeleraComponent },
    { path: 'presupuestos',     component: TypographyComponent },
    { path: 'presupuesto/:id',     component: PresupuestoComponent },
    { path: 'presupuestoPapelera',     component: PresupuestopapeleraComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
];


