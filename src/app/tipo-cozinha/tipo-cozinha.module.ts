import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TipoCozinhaPageRoutingModule } from './tipo-cozinha-routing.module';

import { TipoCozinhaPage } from './tipo-cozinha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TipoCozinhaPageRoutingModule
  ],
  declarations: [TipoCozinhaPage]
})
export class TipoCozinhaPageModule {}
