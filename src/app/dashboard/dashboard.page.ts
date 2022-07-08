import { Component, OnInit } from '@angular/core';
import { ChefeService } from '../services/chefe.service';
import { RestauranteService } from '../services/restaurante.service';
import { TipoCozinhaService } from '../services/tipo-cozinha.service';
import { Chefe } from '../types/Chefe';
import { Restaurante } from '../types/Restaurante';
import { TipoCozinha } from '../types/TipoCozinha';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  restaurantes;
  chefes = new Array<Chefe>();
  tipos;
  constructor(
    private _restaurante: RestauranteService,
    private _chefe: ChefeService,
    private _tipos: TipoCozinhaService) { }

  ngOnInit() {
    this.restaurantes = this._restaurante.listarRestaurantes();

    this.chefes = this._chefe.listar();

    this.tipos = this._tipos.listar()

  }
}
