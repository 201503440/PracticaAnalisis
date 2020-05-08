import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SaldoService {

  constructor(private http: HttpClient) { }

  url_saldo = 'http://localhost:3000/getSaldo';
  usuario: any;

  getSaldo(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Cache-Control': 'no-cache'
      })
    };
    this.usuario = JSON.parse(localStorage.getItem('currentUser'))
    let saldoVar = {
      idCuenta: this.usuario.idCuenta
    }
    let final = (JSON.stringify(saldoVar));
    return this.http.post(this.url_saldo, final, httpOptions);
  }

}
