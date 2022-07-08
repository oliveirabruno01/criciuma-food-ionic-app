import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CadastrarTipoCozinhaComponent } from '../modal/cadastrar-tipo-cozinha/cadastrar-tipo-cozinha.component';
import { TipoCozinhaService } from '../services/tipo-cozinha.service';


@Component({
  selector: 'app-tipo-cozinha',
  templateUrl: './tipo-cozinha.page.html',
  styleUrls: ['./tipo-cozinha.page.scss'],
})
export class TipoCozinhaPage implements OnInit {
  modal;
  tipos_cozinha;
  constructor(
    private _api: TipoCozinhaService,
    private modalController: ModalController) { }

  ngOnInit() {
    this.carregaListaTipoCozinha()
  }

  async adicionarTipoCozinha(){
    this.modal = await this.modalController.create({
      component: CadastrarTipoCozinhaComponent,
      cssClass: 'justify-content: center;'
    });
    await this.modal.present();
    const { data } = await this.modal.onWillDismiss();
    if (data.dismissed) {
      this.carregaListaTipoCozinha()
    }
  }


  async alterarTipoCozinha(item){
    this.modal = await this.modalController.create({
      component: CadastrarTipoCozinhaComponent,
      cssClass: 'justify-content: center;',
      componentProps: {
        'action': 'update',
        '_tipo_cozinha': item
      }
    });
    await this.modal.present();

    const { data } = await this.modal.onWillDismiss();
    if (data.dismissed) {
      this.carregaListaTipoCozinha()
    }
  }


  carregaListaTipoCozinha(){
    this.tipos_cozinha = this._api.listar();
  }

  
  excluirTipoCozinha(id: number){
    this._api.excluir(id).subscribe(
      data => {
        this.carregaListaTipoCozinha();
      },
      () => console.log('Erro ao excluir um tipo de cozinha.')
    );
  }
}
