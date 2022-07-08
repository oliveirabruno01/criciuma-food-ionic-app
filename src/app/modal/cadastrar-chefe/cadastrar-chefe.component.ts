import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ChefeService } from 'src/app/services/chefe.service';
import { TipoCozinhaService } from 'src/app/services/tipo-cozinha.service';
import { Chefe } from 'src/app/types/Chefe';
import { TipoCozinha } from 'src/app/types/TipoCozinha';

@Component({
  selector: 'app-cadastrar-chefe',
  templateUrl: './cadastrar-chefe.component.html',
  styleUrls: ['./cadastrar-chefe.component.scss'],
})
export class CadastrarChefeComponent implements OnInit {
  chefe: Chefe;
  tipos_cozinha: TipoCozinha[];
  chefes: Chefe[]

  @Input() action: string;
  @Input() _chefe: Chefe;
  @Input() name: string;
  @Input() descricao: string;
  @Input() anosExperiencia: number;
  @Input() documentoGeral: string;
  constructor(private modalController: ModalController,
    private _api: ChefeService,
    public alertController: AlertController) { 
      this.chefe = new Chefe();
    }

  ngOnInit() {
    this.chefes = this._api.listar();

    if (this.action === 'update') {
      this.chefe.id = this._chefe.id;
    } else {
      this.chefe.id = null;
    }
  }

  async cadastrarChefe(){
    let message = '';
    if(!this.name){
      message = 'O campo nome é obrigatório!'
    }else if(!this.descricao){
      message = 'O campo descrição é obrigatório!'
    }else if(!this.anosExperiencia){
      message = 'O campo anos de experiência é obrigatório!'
    }else if(!this.documentoGeral){
      message = 'Informe o seu Documento Geral!'
    }
    else if(this.name === "NameInUse") {
      message = 'Nome em uso! Por favor, utilize outro nome'
    }
    else if(this.name === "NotEnoughXp") {
      message = 'É preciso ao menos 4 anos de experiência para se cadastrar na plataforma'
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
      this.chefe.name = this.name;
      this.chefe.descricao = this.descricao;
      this.chefe.anosExperiencia = this.anosExperiencia;
      this.chefe.documentoGeral = this.documentoGeral;

      if(this.action === 'update'){
        this._api.atualizar(this.chefe).subscribe(
          data => {
            if (data.id === 0) {
              this.name = data.name;
              this.cadastrarChefe();
            }
            this.dismissModal();
          },
          () => console.log('Erro ao atualizar um chefe.')
        );
      }else{
        this._api.cadastrar(this.chefe).subscribe(
          data => {
            if (data.id === 0) {
              this.name = data.name;
              this.cadastrarChefe();
            }
            this.dismissModal();
          },
          () => console.log('Erro ao cadastrar um chefe.')
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
