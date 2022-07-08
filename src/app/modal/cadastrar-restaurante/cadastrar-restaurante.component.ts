import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ChefeService } from 'src/app/services/chefe.service';
import { RestauranteService } from 'src/app/services/restaurante.service';
import { TipoCozinhaService } from 'src/app/services/tipo-cozinha.service';
import { Chefe } from 'src/app/types/Chefe';
import { Restaurante } from 'src/app/types/Restaurante';
import { TipoCozinha } from 'src/app/types/TipoCozinha';

@Component({
  selector: 'app-cadastrar-restaurante',
  templateUrl: './cadastrar-restaurante.component.html',
  styleUrls: ['./cadastrar-restaurante.component.scss'],
})
export class CadastrarRestauranteComponent implements OnInit {
  restaurante: Restaurante;
  tipos_cozinha: TipoCozinha[];
  chefes: Chefe[]

  @Input() action: string;
  @Input() _restaurante: Restaurante;
  @Input() name: string;
  @Input() address: string;
  @Input() district: string;
  @Input() id_cozinha_tipo: number;
  @Input() id_chefe: number
  constructor(private modalController: ModalController,
    private _api: RestauranteService,
    private _cozinha_api: TipoCozinhaService,
    private _chefe_api: ChefeService,
    public alertController: AlertController) { 
      this.restaurante = new Restaurante();
    }

  ngOnInit() {
    this.tipos_cozinha = this._cozinha_api.listar();
    this.chefes = this._chefe_api.listar();

    if (this.action === 'update') {
      this.restaurante.id = this._restaurante.id;
    } else {
      this.restaurante.id = null;
    }
  }

  async cadastrarRestaurante(){
    let message = '';
    if(!this.name){
      message = 'O campo nome é obrigatório!'
    }else if(!this.address){
      message = 'O campo endereço é obrigatório!'
    }else if(!this.district){
      message = 'O campo bairro é obrigatório!'
    }else if(!this.id_cozinha_tipo){
      message = 'Selecione um tipo de cozinha!'
    }else if(!this.id_chefe){
      message = 'Selecione um chefe!'
    }
    else if (this.name === "MaxRestaraunteByAddressReached") {
      message = "Máximo de restaurantes por endereço atingido!";
    } else if (this.name === "MaxRestaraunteByDistrictReached"){
      message = "Máximo de restaurantes por bairro atingido!";
    } else if (this.name === "MaxTypeByDistrictReached"){
      message = "Não é mais possível cadastrar esse tipo de cozinha no bairro escolhido!";
    } else if (this.name === "MaxRestaurantesByChefeReached"){
      message = "Máximo de restaurantes por chefe atingido!";
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
      this.restaurante.name = this.name;
      this.restaurante.address = this.address;
      this.restaurante.district = this.district;
      this.restaurante.idCozinhaTipo = this.id_cozinha_tipo;
      this.restaurante.idChefe = this.id_chefe;

      if(this.action === 'update'){
        this._api.atualizarR(this.restaurante).subscribe(
          data => {
            if (data.id === 0) {
              this.name = data.name;
              this.restaurante.id = 0;
              this.cadastrarRestaurante()
            }
            this.dismissModal();
          },
          () => console.log('Erro ao atualizar um restaurante.')
        );
      }else{
        this._api.cadastrarR(this.restaurante).subscribe(
          data => {
            if (data.id === 0) {
              this.name = data.name;
              this.cadastrarRestaurante()
            }
            this.dismissModal();
            
          },
          () => console.log('Erro ao cadastrar um restaurante.')
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
