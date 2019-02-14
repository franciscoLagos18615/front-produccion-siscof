import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/home', title: 'Inicio',  icon: 'home', class: '' },
    { path: '/user-profile', title: 'Perfil Usuario',  icon:'person', class: '' },
    //table-list
    { path: '/remesas', title: 'Remesas',  icon:'content_paste', class: '' },
    //typography
    { path: '/presupuestos', title: 'Presupuestos',  icon:'attach_money', class: '' },
    { path: '/panelAdministracion', title: 'Panel de Administración',  icon:'dashboard', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
