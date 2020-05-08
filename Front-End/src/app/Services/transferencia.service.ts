import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class TransferenciaService {

  usuario: any;
  url_saldo = 'http://localhost:3000/saldo';  
  url_transferir = 'http://localhost:3000/transferencia';

  constructor(private http: HttpClient,
    private matSnackBar: MatSnackBar) { }

  Saldo(cuenta: number, monto: number){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Cache-Control': 'no-cache'
      })
    };
    this.usuario = JSON.parse(localStorage.getItem('currentUser'))
    let saldoVar = {
      idCuenta: this.usuario.idCuenta,
      SaldoTotal: monto
    }
    let final = (JSON.stringify(saldoVar));
    return this.http.post(this.url_saldo, final, httpOptions).subscribe((data) => {       
      if (Object.values(data)[0] === 1) {
        //AQUI TIENE SALDO SUFICIENTE PARA TRANSFERIR
        this.transferir(cuenta,monto);
      } else {
        //AQUI NO TIENE SALDO SUFICIENTE
        this.matSnackBar.open('NO TIENE SALDO SUFICIENTE PARA TRANSFERIR.!', 'Aceptar', {
          duration: 2000,
        });        
      }
    });
  }

  transferir(cuenta: number, monto: number){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Cache-Control': 'no-cache'
      })
    };

    this.usuario = JSON.parse(localStorage.getItem('currentUser'))
    let saldoVar = {
      idCuenta: this.usuario.idCuenta,
      idCuentaD: cuenta,
      SaldoTotal: monto
    }
    let final = (JSON.stringify(saldoVar));
    return this.http.post(this.url_transferir, final, httpOptions).subscribe((data) => {       
      if (Object.values(data)[0] === 1) {
        //TRANSFERENCIA COMPLETADA CORRECTAMENTE
        this.matSnackBar.open('TRANSFERENCIA COMPLETADA!', 'Aceptar', {
          duration: 3000,
        });
        
      } else {
        //TRANSFERENCIA NO COMPLETADA CORRECTAMENTE
        this.matSnackBar.open('CUENTA DESTINO NO EXISTE!', 'Aceptar', {
          duration: 2000,
        });        
      }
    }); 
  }
  
}
