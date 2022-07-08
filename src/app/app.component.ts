import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Dashboard', url: '/dashboard', icon: 'home' },
    { title: 'Restaurantes', url: '/restaurante', icon: 'restaurant' },
    { title: 'Tipos de Cozinha', url: '/tipo-cozinha', icon: 'list' },
    { title: 'Chefes', url: '/chefe', icon: 'man' },
  ];
  constructor() {

  }
}
