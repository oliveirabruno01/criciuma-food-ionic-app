import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Restaurante } from '../types/Restaurante';

const headers = new HttpHeaders({'Content-Type': 'application/json'})

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  private API_URL = `http://localhost:8080/webresources/restaurantes/`

  constructor(private http: HttpClient) { }

  listarRestaurantes(): Restaurante[] {
    let res = this.http.get<Restaurante[]>(this.API_URL)
    let restaurantes = new Array<Restaurante>();
    res.subscribe(response =>
      {
        response.map(item =>
          {
            let restaurante = new Restaurante();
            restaurante.id = item.id;
            restaurante.name = item.name;
            restaurante.district = item.district;
            restaurante.address = item.address;
            restaurante.idCozinhaTipo = item.idCozinhaTipo;
            restaurante.idChefe = item.idChefe

            restaurantes.push(restaurante);
          })
      })
    
    return restaurantes;
  }

  excluirR(id: number) {
    return this.http.delete<Restaurante>(this.API_URL + id);
  }

  cadastrarR(restaurante: Restaurante) {
    return this.http.post<Restaurante>(this.API_URL, JSON.stringify(restaurante), {headers:headers});
  }

  atualizarR(restaurante: Restaurante) {
    return this.http.put<Restaurante>(this.API_URL + restaurante?.id, JSON.stringify(restaurante), {headers: headers});
  }
}
