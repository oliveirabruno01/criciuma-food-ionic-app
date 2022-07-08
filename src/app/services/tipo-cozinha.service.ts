import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TipoCozinha } from '../types/TipoCozinha';

const headers = new HttpHeaders({'Content-Type': 'application/json'})

@Injectable({
  providedIn: 'root'
})
export class TipoCozinhaService {

  private API_URL = `http://localhost:8080/webresources/tipos_cozinha/`

  constructor(private http: HttpClient) {}

  listar(): TipoCozinha[]{
    let res = this.http.get<TipoCozinha[]>(this.API_URL)
    let tipos_cozinha = new Array<TipoCozinha>();
    res.subscribe(response =>
      {
        response.map(item =>
          {
            let tipo = new TipoCozinha();
            tipo.id = item.id;
            tipo.name = item.name;
            tipo.descricao = item.descricao;
            tipo.origin = item.origin;
            tipo.samples = item.samples;
            tipos_cozinha.push(tipo)
          })
      })
    
      return tipos_cozinha;
  }

  excluir(id: number) {
    return this.http.delete<TipoCozinha>(this.API_URL + id);
  }

  cadastrar(tipo_cozinha: TipoCozinha) {
    return this.http.post<TipoCozinha>(this.API_URL, JSON.stringify(tipo_cozinha), {headers:headers});
  }

  atualizar(tipo_cozinha: TipoCozinha) {
    let id = tipo_cozinha.id;
    tipo_cozinha.id = null;
    return this.http.put<TipoCozinha>(this.API_URL + id, JSON.stringify(tipo_cozinha), {headers:headers});
  }
}
