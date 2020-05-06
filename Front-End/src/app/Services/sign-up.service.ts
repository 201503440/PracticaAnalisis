import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Usuario } from '../Models/usuario';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  url_signup = 'http://localhost:3000/signup';

  constructor(private http: HttpClient,
              private matSnackBar: MatSnackBar) { }

  signupMethod(user: Usuario){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Cache-Control': 'no-cache'
      })
    };
    let final = (JSON.stringify(user));
    return this.http.post(this.url_signup, final, httpOptions).subscribe((data) => {       
      if (Object.values(data)[0] === 1) {
        //AQUI SE REGISTRO CORRECTAMENTE
        this.matSnackBar.open('REGISTRADO.! SU CODIGO ASOCIADO ES: '+Object.values(data)[1], 'Aceptar', {
          duration: 4000,
        });
      } else {
        //AQUI LOS DATOS NO SON VALIDOS
        this.matSnackBar.open('DATOS NO VALIDOS.!', 'Aceptar', {
          duration: 2000,
        });        
      }
    });
  }
}
