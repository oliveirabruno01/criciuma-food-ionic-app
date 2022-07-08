import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { identity } from 'rxjs';
import { CadastrarRestauranteComponent } from '../modal/cadastrar-restaurante/cadastrar-restaurante.component';
import { ChefeService } from '../services/chefe.service';
import { RestauranteService } from '../services/restaurante.service';
import { TipoCozinhaService } from '../services/tipo-cozinha.service';
import { Chefe } from '../types/Chefe';
import { TipoCozinha } from '../types/TipoCozinha';

@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.page.html',
  styleUrls: ['./restaurante.page.scss'],
})
export class RestaurantePage implements OnInit {
  restaurantes;
  isModalOpen = false;
  modal;
  tipos_cozinha: TipoCozinha[];
  chefes: Chefe[];

  constructor(
    private _api: RestauranteService,
    private _tipos_cozinha_api: TipoCozinhaService,
    private _chefes_api: ChefeService,
    private modalController: ModalController
    ) { }

  ngOnInit() {
    this.carregaListaRestaurantes();
    this.tipos_cozinha = this._tipos_cozinha_api.listar();
    this.chefes = this._chefes_api.listar();
  }

  async adicionarRestaurante(){
    this.modal = await this.modalController.create({
      component: CadastrarRestauranteComponent,
      cssClass: 'justify-content: center;'
    });
    await this.modal.present();
    const { data } = await this.modal.onWillDismiss();
    if (data.dismissed) {
      this.carregaListaRestaurantes()
    }
  }

  async alterarRestaurante(item){
    this.modal = await this.modalController.create({
      component: CadastrarRestauranteComponent,
      cssClass: 'justify-content: center;',
      componentProps: {
        'action': 'update',
        '_restaurante': item
      }
    });
    await this.modal.present();
    const { data } = await this.modal.onWillDismiss();
    if (data.dismissed) {
      this.carregaListaRestaurantes()
    }
  }

  excluirRestaurante(id: number){
    this._api.excluirR(id).subscribe(
      data => {
        this.carregaListaRestaurantes();
      },
      () => console.log('Erro ao excluir um restaurante.')
    );
  }

  carregaListaRestaurantes(){
    this.restaurantes = this._api.listarRestaurantes()
  }

  cozinhaBy(_id: number) {
    return this.tipos_cozinha.find(tipo => {
      return tipo.id === _id;
    })?.name
  }

  chefeBy(_id: number) {
    return this.chefes.find(chefe => {
      return chefe.id === _id;
    })?.name
  }
}
