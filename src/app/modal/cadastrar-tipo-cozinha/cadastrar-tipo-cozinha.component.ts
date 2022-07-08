import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';;
import { TipoCozinhaService } from 'src/app/services/tipo-cozinha.service';
import { TipoCozinha } from 'src/app/types/TipoCozinha';

@Component({
  selector: 'app-cadastrar-tipo-cozinha',
  templateUrl: './cadastrar-tipo-cozinha.component.html',
  styleUrls: ['./cadastrar-tipo-cozinha.component.scss'],
})
export class CadastrarTipoCozinhaComponent implements OnInit {
  tipo_cozinha: TipoCozinha;
  tipos_cozinha: TipoCozinha[];

  @Input() action: string;
  @Input() _tipo_cozinha: TipoCozinha;
  @Input() name: string;
  @Input() descricao: string;
  @Input() origin: string;
  @Input() samples: string;
  constructor(private modalController: ModalController,
    private _api: TipoCozinhaService,
    public alertController: AlertController) { 
      this.tipo_cozinha = new TipoCozinha();
    }

  ngOnInit() {
    this.tipos_cozinha = this._api.listar();

    if (this.action === 'update') {
      this.tipo_cozinha.id = this._tipo_cozinha.id;
    } else {
      this.tipo_cozinha.id = null;
    }
  }

  async cadastrarTipoCozinha(){
    let message = '';
    if(!this.name){
      message = 'O campo nome é obrigatório!'
    }else if(!this.descricao){
      message = 'O campo descrição é obrigatório!'
    }else if(!this.origin){
      message = 'O campo origem é obrigatório!'
    }else if(!this.samples){
      message = 'Por favor, insira alguns exemplos de comida desse tipo de restaurante!'
    }
    if(message !== ''){
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Erro',
        message: message,
        buttons: ['OK']
      });
  
      await alert.present();
      message = '';
    }else {
      this.tipo_cozinha.name = this.name;
      this.tipo_cozinha.descricao = this.descricao;
      this.tipo_cozinha.origin = this.origin;
      this.tipo_cozinha.samples = this.samples;
      
      if(this.action === 'update'){
        this._api.atualizar(this.tipo_cozinha).subscribe(
          data => {
            this.dismissModal();
          },
          () => console.log('Erro ao atualizar um Tipo de Cozinha.')
        );
      }else{
        this._api.cadastrar(this.tipo_cozinha).subscribe(
          data => {
            this.dismissModal();
          },
          () => console.log('Erro ao cadastrar um Tipo de Cozinha.')
        );
      }
    }
  }

  dismissModal(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
