import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Chefe } from '../types/Chefe';

const headers = new HttpHeaders({'Content-Type': 'application/json'})

@Injectable({
  providedIn: 'root'
})
export class ChefeService {

  private API_URL = `http://localhost:8080/webresources/chefes/`

  constructor(private http: HttpClient) {}

  listar(): Chefe[]{
    let res = this.http.get<Chefe[]>(this.API_URL);
    let chefes = new Array<Chefe>();
    res.subscribe(response =>
      {
        response.map(item =>
          {
            let c = new Chefe();
            c.id = item.id;
            c.name = item.name;
            c.descricao = item.descricao;
            c.anosExperiencia = item.anosExperiencia;
            c.documentoGeral = item.documentoGeral;
            chefes.push(c);
          })
      })

    return chefes;
  }

  excluir(id: number) {
    return this.http.delete<Chefe>(this.API_URL + id);
  }

  cadastrar(chefe: Chefe) {
    return this.http.post<Chefe>(this.API_URL, JSON.stringify(chefe), {headers: headers});
  }

  atualizar(chefe: Chefe) {
    let id = chefe.id;
    chefe.id = null;
    return this.http.put<Chefe>(this.API_URL + id, JSON.stringify(chefe), {headers: headers});
  }
}
