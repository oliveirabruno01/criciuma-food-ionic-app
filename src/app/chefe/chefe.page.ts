import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CadastrarChefeComponent } from '../modal/cadastrar-chefe/cadastrar-chefe.component';
import { ChefeService } from '../services/chefe.service';
import { Chefe } from '../types/Chefe';

@Component({
  selector: 'app-chefe',
  templateUrl: './chefe.page.html',
  styleUrls: ['./chefe.page.scss'],
})
export class ChefePage implements OnInit {
  modal;
  chefes;
  constructor(
    private _api: ChefeService,
    private modalController: ModalController) { }

  ngOnInit() {
    this.carregaListaChefe()
  }

  async adicionarChefe(){
    this.modal = await this.modalController.create({
      component: CadastrarChefeComponent,
      cssClass: 'justify-content: center;'
    });

    await this.modal.present();

    const { data } = await this.modal.onWillDismiss();
    if (data.dismissed) {
      this.carregaListaChefe()
    }
  }


  async alterarChefe(item){
    this.modal = await this.modalController.create({
      component: CadastrarChefeComponent,
      cssClass: 'justify-content: center;',
      componentProps: {
        'action': 'update',
        '_chefe': item
      }
    });
    await this.modal.present();

    const { data } = await this.modal.onWillDismiss();
    if (data.dismissed) {
      this.carregaListaChefe()
    }
  }


  carregaListaChefe(){
    this.chefes = this._api.listar();
  }

  
  excluirChefe(id: number){
    this._api.excluir(id).subscribe(
      data => {
        this.carregaListaChefe();
      },
      () => console.log('Erro ao excluir um chefe.')
    );
  }
}
