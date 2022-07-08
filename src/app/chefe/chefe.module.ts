import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChefePageRoutingModule } from './chefe-routing.module';

import { ChefePage } from './chefe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChefePageRoutingModule
  ],
  declarations: [ChefePage]
})
export class ChefePageModule {}
