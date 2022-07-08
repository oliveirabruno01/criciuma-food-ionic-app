import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestService } from './interceptor/request.service';
import { FormsModule } from '@angular/forms';
import { CadastrarRestauranteComponent } from './modal/cadastrar-restaurante/cadastrar-restaurante.component';
import { CadastrarChefeComponent } from './modal/cadastrar-chefe/cadastrar-chefe.component';
import { CadastrarTipoCozinhaComponent } from './modal/cadastrar-tipo-cozinha/cadastrar-tipo-cozinha.component';


@NgModule({
  declarations: [AppComponent, CadastrarRestauranteComponent, CadastrarChefeComponent, CadastrarTipoCozinhaComponent],
  entryComponents: [],
  imports: [BrowserModule, BrowserAnimationsModule, FormsModule, NgxSpinnerModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },{
    provide: HTTP_INTERCEPTORS,
    useClass: RequestService,
    multi: true
  },],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule {}
